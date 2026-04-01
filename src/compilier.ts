import * as Blockly from "blockly";
import * as BlocklyGLSL from "./generators/glsl";

let debug: boolean = true

class GraphicsContext {
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram;
    private canvas: HTMLCanvasElement;
    private vertexShader: WebGLShader;
    private fragmentShader: WebGLShader;
    constructor(gl: WebGL2RenderingContext, program: WebGLProgram, canvas: HTMLCanvasElement, vertextShader: WebGLShader, fragmentShader: WebGLShader) {
        this.gl = gl;
        this.program = program;
        this.canvas = canvas;
        this.vertexShader = vertextShader;
        this.fragmentShader = fragmentShader;
    }

    draw() {
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    updateUniforms(time: number) {
        const timeLocation = this.gl.getUniformLocation(this.program, "u_time");
        const resLocation = this.gl.getUniformLocation(this.program, "u_resolution");

        this.gl.uniform1f(timeLocation, time);
        this.gl.uniform2f(resLocation, this.canvas.width, this.canvas.height);
    }

    setFragmentShader(source: string): void {
        if (debug) {
            console.log(source)
        }

        this.gl.shaderSource(this.fragmentShader, source);
        this.gl.compileShader(this.fragmentShader);
        
        if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
            console.error("Fragment Shader Error:", this.gl.getShaderInfoLog(this.fragmentShader));
            return;
        }

        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error("Program Link Error:", this.gl.getProgramInfoLog(this.program));
            return;
        }

        this.gl.useProgram(this.program);
    }
}

function makeGraphics(): GraphicsContext | null {
    const raymarcherDiv = document.getElementById("raymarcherDiv") as HTMLDivElement | null;
    const canvas = document.createElement("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    raymarcherDiv?.appendChild(canvas);

    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error("This browser does not support WebGL 2.");
        return null;
    }

    function makeShader(src: string, type: number): WebGLShader | null {
        const shader = gl!.createShader(type);
        if (!shader) return null;

        gl!.shaderSource(shader, src);
        gl!.compileShader(shader);

        if (gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
            return shader;
        } else {
            console.error('Shader compilation failed: ', gl!.getShaderInfoLog(shader));
            gl!.deleteShader(shader);
            return null;
        }
    }

    function createProgram(vertShad: WebGLShader, fragShad: WebGLShader): WebGLProgram | null {
        const program = gl!.createProgram();
        if (!program) return null;

        gl!.attachShader(program, vertShad);
        gl!.attachShader(program, fragShad);
        gl!.linkProgram(program);

        if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
            console.error('Program linking failed: ', gl!.getProgramInfoLog(program));
            gl!.deleteProgram(program);
            return null;
        }

        return program;
    }

    const vertexSource = `#version 300 es
    in vec4 a_position;
    out vec4 pos4;

    void main() {
        pos4 = a_position;
        gl_Position = a_position;
    }`;

    const fragmentSource = `#version 300 es

    precision highp float;

    in vec4 pos4;
    out vec4 color;

    void main() {
        color = vec4(0.0);
    }`;

    const vertexShader = makeShader(vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = makeShader(fragmentSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
        console.error("Failed to create shaders.");
        return null;
    }

    const program = createProgram(vertexShader, fragmentShader);
    if (!program) {
        console.error("Failed to create program.");
        return null;
    }

    const positionAttribLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);

    const vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    return new GraphicsContext(
        gl,
        program,
        canvas,
        vertexShader,
        fragmentShader
    );
}

export const graphics: GraphicsContext | null = makeGraphics();

export function compile(workspace: Blockly.Workspace): void {
    const source = makeFragmentSource(indent(BlocklyGLSL.gLSLGenerator.workspaceToCode(workspace)));
    if (graphics) {
        graphics.setFragmentShader(source);
        graphics.draw();
    }
};

export function indent(string: string): string {
    return string.split("\n").join("\n    ")
}

export function makeFragmentSource(scene: string): string { 
return `#version 300 es

#define MIN_DISTANCE_TO_SURFACE 0.0001
#define MAX_DIST_TO_TRAVEL 1000.0
#define MAXIMUM_RAY_STEPS 100.0
#define FIELD_OF_VIEW 75.0

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

vec3 cameraPosition = vec3(0, 1, -5);
mat3 cameraViewMatrix = mat3(
    1,0,0,
    0,1,0,
    0,0,1
);

in vec4 pos4;
out vec4 outColor;

struct Surface {
    vec3 diffuseColor;
    float roughness;
    float metallicity;
    float emission;
};

struct SDF {
    float signedDistance;
    Surface material;
    float stepCount;
};

Surface makeSurface(vec3 diffuseColor, float roughness, float metallicity, float emission) {
    return Surface(diffuseColor, roughness, metallicity, emission);
}

SDF makeSDF(float distance, Surface surface) {
    return SDF(distance, surface, 0.0);
}

// helpers

float ndot(vec2 a, vec2 b) { return a.x*b.x - a.y*b.y; }
float dot2( vec3 v ) { return dot(v,v); }

// sdf operations

SDF opUnion(SDF a, SDF b){
    if (b.signedDistance < a.signedDistance) {
        return b;
    }
    return a;
}

SDF opSmoothUnion(SDF a, SDF b, float smoothingFactor) {
    float h = clamp(0.5 + 0.5 * (b.signedDistance - a.signedDistance) / smoothingFactor, 0.0, 1.0);

    SDF result;

    result.signedDistance = mix(b.signedDistance, a.signedDistance, h) - smoothingFactor * h * (1.0 - h);

    result.material.diffuseColor = mix(b.material.diffuseColor, a.material.diffuseColor, h);
    result.material.roughness = mix(b.material.roughness, a.material.roughness, h);
    result.material.metallicity = mix(b.material.metallicity, a.material.metallicity, h);
    result.material.emission = mix(b.material.emission, a.material.emission, h);

    return result;
}

// position operations

vec3 opTranslate(vec3 samplingPosition, vec3 by) {
    return samplingPosition - by; // yeah this is all this is lmao
}
    
// primative sdfs (christ almighty)
// thank you to https://iquilezles.org/articles/distfunctions/ for like all of these

SDF sdSphere( vec3 p, Surface surface, float r )
{
  return makeSDF(length(p) - r, surface);
}

SDF sdBox(vec3 p, Surface surface, vec3 b) {
    vec3 q = abs(p) - b;
    return makeSDF(length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0), surface);
}

SDF sdRoundBox(vec3 p, Surface surface, vec3 b, float r) {
    vec3 q = abs(p) - b;
    return makeSDF(length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r, surface);
}

SDF sdBoxFrame( vec3 p, Surface surface, vec3 b, float e ) {
    vec3 p2 = abs(p)-b;
    vec3 q = abs(p2+e)-e;
    float d = min(min(
      length(max(vec3(p2.x,q.y,q.z),0.0))+min(max(p2.x,max(q.y,q.z)),0.0),
      length(max(vec3(q.x,p2.y,q.z),0.0))+min(max(q.x,max(p2.y,q.z)),0.0)),
      length(max(vec3(q.x,q.y,p2.z),0.0))+min(max(q.x,max(q.y,p2.z)),0.0));
    return makeSDF(d, surface);
}

SDF sdTorus( vec3 p, Surface surface, vec2 t ) {
    vec2 q = vec2(length(p.xz)-t.x,p.y);
    return makeSDF(length(q)-t.y, surface);
}

SDF sdCappedTorus(vec3 p, Surface surface, vec2 t, float angleStart, float angleEnd) {
    // A simplified bounded torus utilizing absolute symmetry
    float rad = radians((angleEnd - angleStart) * 0.5);
    vec2 sc = vec2(sin(rad), cos(rad));
    p.x = abs(p.x);
    float k = (sc.y*p.x > sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
    return makeSDF(sqrt( dot(p,p) + t.x*t.x - 2.0*t.x*k ) - t.y, surface);
}

SDF sdLink( vec3 p, Surface surface, float le, float r1, float r2 ) {
    vec3 q = vec3( p.x, max(abs(p.y)-le,0.0), p.z );
    return makeSDF(length(vec2(length(q.xy)-r1,q.z)) - r2, surface);
}

SDF sdCylinder( vec3 p, Surface surface, float r ) {
    return makeSDF(length(p.xz) - r, surface);
}

SDF sdCone( vec3 p, Surface surface, float angle, float h ) {
    float rad = radians(angle);
    vec2 c = vec2(sin(rad), cos(rad));
    vec2 q = h*vec2(c.x/c.y,-1.0);
    vec2 w = vec2( length(p.xz), p.y );
    vec2 a = w - q*clamp( dot(w,q)/dot(q,q), 0.0, 1.0 );
    vec2 b = w - q*vec2( clamp( w.x/q.x, 0.0, 1.0 ), 1.0 );
    float k = sign( q.y );
    float d = min(dot( a, a ),dot(b, b));
    float s = max( k*(w.x*q.y-w.y*q.x),k*(w.y-q.y)  );
    return makeSDF(sqrt(d)*sign(s), surface);
}

SDF sdInfCone( vec3 p, Surface surface, float angle ) {
    float rad = radians(angle);
    vec2 c = vec2(sin(rad), cos(rad));
    vec2 q = vec2( length(p.xz), -p.y );
    float d = length(q-c*max(dot(q,c), 0.0));
    return makeSDF(d * ((q.x*c.y-q.y*c.x<0.0)?-1.0:1.0), surface);
}

SDF sdPlane( vec3 p, Surface surface, vec3 n, float h ) {
    return makeSDF(dot(p,n) + h, surface);
}

SDF sdHexPrism( vec3 p, Surface surface, vec2 h ) {
    const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
    p = abs(p);
    p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
    vec2 d = vec2(
       length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
       p.z-h.y );
    return makeSDF(min(max(d.x,d.y),0.0) + length(max(d,0.0)), surface);
}

SDF sdTriPrism( vec3 p, Surface surface, vec2 h ) {
    vec3 q = abs(p);
    return makeSDF(max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5), surface);
}

SDF sdCapsule( vec3 p, Surface surface, vec3 a, vec3 b, float r ) {
    vec3 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return makeSDF(length( pa - ba*h ) - r, surface);
}

SDF sdVerticalCapsule( vec3 p, Surface surface, float h, float r ) {
    p.y -= clamp( p.y, 0.0, h );
    return makeSDF(length( p ) - r, surface);
}

SDF sdVerticalCappedCylinder( vec3 p, Surface surface, float h, float r ) {
    vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(r,h);
    return makeSDF(min(max(d.x,d.y),0.0) + length(max(d,0.0)), surface);
}

SDF sdArbitraryCappedCylinder( vec3 p, Surface surface, vec3 a, vec3 b, float r ) {
    vec3  ba = b - a;
    vec3  pa = p - a;
    float baba = dot(ba,ba);
    float paba = dot(pa,ba);
    float x = length(pa*baba-ba*paba) - r*baba;
    float y = abs(paba-baba*0.5)-baba*0.5;
    float x2 = x*x;
    float y2 = y*y*baba;
    float d = (max(x,y)<0.0)?-min(x2,y2):(((x>0.0)?x2:0.0)+((y>0.0)?y2:0.0));
    return makeSDF(sign(d)*sqrt(abs(d))/baba, surface);
}

SDF sdRoundedCylinder( vec3 p, Surface surface, float ra, float rb, float h ) {
    vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );
    return makeSDF(min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb, surface);
}

SDF sdSimpleCappedCone( vec3 p, Surface surface, float h, float r1, float r2 ) {
    vec2 q = vec2( length(p.xz), p.y );
    vec2 k1 = vec2(r2,h);
    vec2 k2 = vec2(r2-r1,2.0*h);
    vec2 ca = vec2(q.x-min(q.x,(q.y<0.0)?r1:r2), abs(q.y)-h);
    vec2 cb = q - k1 + k2*clamp( dot(k1-q,k2)/dot(k2,k2), 0.0, 1.0 );
    float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0;
    return makeSDF(s*sqrt( min(dot(ca,ca),dot(cb,cb)) ), surface);
}

SDF sdCappedCone( vec3 p, Surface surface, vec3 a, vec3 b, float ra, float rb ) {
    float rba  = rb-ra;
    float baba = dot(b-a,b-a);
    float papa = dot(p-a,p-a);
    float paba = dot(p-a,b-a)/baba;
    float x = sqrt( papa - paba*paba*baba );
    float cax = max(0.0,x-((paba<0.5)?ra:rb));
    float cay = abs(paba-0.5)-0.5;
    float k = rba*rba + baba;
    float f = clamp( (rba*(x-ra)+paba*baba)/k, 0.0, 1.0 );
    float cbx = x-ra - f*rba;
    float cby = paba - f;
    float s = (cbx<0.0 && cay<0.0) ? -1.0 : 1.0;
    return makeSDF(s*sqrt( min(cax*cax + cay*cay*baba, cbx*cbx + cby*cby*baba) ), surface);
}

SDF sdSolidAngle(vec3 p, Surface surface, float angle, float ra) {
    float rad = radians(angle);
    vec2 c = vec2(sin(rad), cos(rad));
    vec2 q = vec2( length(p.xz), p.y );
    float l = length(q) - ra;
    float m = length(q - c*clamp(dot(q,c),0.0,ra) );
    return makeSDF(max(l,m*sign(c.y*q.x-c.x*q.y)), surface);
}

SDF sdCutSphere( vec3 p, Surface surface, float r, float h ) {
    float w = sqrt(r*r-h*h);
    vec2 q = vec2( length(p.xz), p.y );
    float s = max( (h-r)*q.x*q.x + w*w*(h+r-2.0*q.y), h*q.x - w*q.y );
    float d = (s<0.0) ? length(q)-r :
           (q.x<w) ? h - q.y     :
                     length(q-vec2(w,h));
    return makeSDF(d, surface);
}

SDF sdCutHollowSphere( vec3 p, Surface surface, float r, float h, float t ) {
    float w = sqrt(r*r-h*h);
    vec2 q = vec2( length(p.xz), p.y );
    return makeSDF((h*q.x<w*q.y) ? length(q-vec2(w,h)) : 
                                  abs(length(q)-r)-t, surface);
}

SDF sdDeathStar( vec3 p, Surface surface, float ra, float rb, float d ) {
    float a = (ra*ra - rb*rb + d*d)/(2.0*d);
    float b = sqrt(max(ra*ra-a*a,0.0));
    vec2 q = vec2( p.x, length(p.yz) );
    if( (q.x*b-q.y*a) > d*max(b-q.y,0.0) )
        return makeSDF(length(q-vec2(a,b)), surface);
    else
        return makeSDF(max( (length(q)-ra),
                   -(length(q-vec2(d,0))-rb)), surface);
}

SDF sdSimpleRoundCone( vec3 p, Surface surface, float h, float r1, float r2 ) {
    vec2 q = vec2( length(p.xz), p.y );
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(q,vec2(-b,a));
    if( k < 0.0 ) return makeSDF(length(q) - r1, surface);
    if( k > a*h ) return makeSDF(length(q-vec2(0.0,h)) - r2, surface);
    return makeSDF(dot(q, vec2(a,b) ) - r1, surface);
}

SDF sdRoundCone( vec3 p, Surface surface, vec3 a, vec3 b, float r1, float r2 ) {
    vec3  ba = b - a;
    float l2 = dot(ba,ba);
    float rr = r1 - r2;
    float a2 = l2 - rr*rr;
    float il2 = 1.0/l2;
    vec3 pa = p - a;
    float y = dot(pa,ba);
    float z = y - l2;
    float x2 = dot( pa*l2 - ba*y, pa*l2 - ba*y );
    float y2 = y*y*l2;
    float z2 = z*z*l2;
    float k = sign(rr)*rr*rr*x2;
    if( sign(z)*a2*z2 > k ) return makeSDF(sqrt(x2 + z2)        *il2 - r2, surface);
    if( sign(y)*a2*y2 < k ) return makeSDF(sqrt(x2 + y2)        *il2 - r1, surface);
                            return makeSDF((sqrt(x2*a2*il2)+y*rr)*il2 - r1, surface);
}

SDF sdVesicaSegment( vec3 p, Surface surface, vec3 a, vec3 b, float w ) {
    vec3  c = (a+b)*0.5;
    float l = length(b-a);
    vec3  v = (b-a)/l;
    float y = dot(p-c,v);
    vec2  q = vec2(length(p-c-y*v), abs(y));
    float r = 0.5*l;
    float d = 0.5*(r*r-w*w)/w;
    vec3  h = (r*q.x < d*(q.y-r)) ? vec3(0.0,r,0.0) : vec3(-d,0.0,d+w);
    return makeSDF(length(q-h.xy) - h.z, surface);
}

SDF sdRhombus( vec3 p, Surface surface, float la, float lb, float h, float ra ) {
    p = abs(p);
    float f = clamp( (la*p.x-lb*p.z+lb*lb)/(la*la+lb*lb), 0.0, 1.0 );
    vec2  w = p.xz - vec2(la,lb)*vec2(f,1.0-f);
    vec2  q = vec2( length(w)*sign(w.x)-ra, p.y-h);
    return makeSDF(min(max(q.x,q.y),0.0) + length(max(q,0.0)), surface);
}

SDF sdOctahedron( vec3 p, Surface surface, float s ) {
    p = abs(p);
    float m = p.x+p.y+p.z-s;
    vec3 q;
         if( 3.0*p.x < m ) q = p.xyz;
    else if( 3.0*p.y < m ) q = p.yzx;
    else if( 3.0*p.z < m ) q = p.zxy;
    else return makeSDF(m*0.57735027, surface);
    float k = clamp(0.5*(q.z-q.y+s),0.0,s); 
    return makeSDF(length(vec3(q.x,q.y-s+k,q.z-k)), surface); 
}

SDF sdPyramid( vec3 p, Surface surface, float h ) {
    float m2 = h*h + 0.25;
    p.xz = abs(p.xz);
    p.xz = (p.z>p.x) ? p.zx : p.xz;
    p.xz -= 0.5;
    vec3 q = vec3( p.z, h*p.y - 0.5*p.x, h*p.x + 0.5*p.y);
    float s = max(-q.x,0.0);
    float t = clamp( (q.y-0.5*p.z)/(m2+0.25), 0.0, 1.0 );
    float a = m2*(q.x+s)*(q.x+s) + q.y*q.y;
    float b = m2*(q.x+0.5*t)*(q.x+0.5*t) + (q.y-m2*t)*(q.y-m2*t);
    float d2 = min(q.y,-q.x*m2-q.y*0.5) > 0.0 ? 0.0 : min(a,b);
    return makeSDF(sqrt( (d2+q.z*q.z)/m2 ) * sign(max(q.z,-p.y)), surface);
}

SDF udTriangle( vec3 p, Surface surface, vec3 a, vec3 b, vec3 c ) {
    vec3 ba = b - a; vec3 pa = p - a;
    vec3 cb = c - b; vec3 pb = p - b;
    vec3 ac = a - c; vec3 pc = p - c;
    vec3 nor = cross( ba, ac );
    float d = sqrt(
    (sign(dot(cross(ba,nor),pa)) +
     sign(dot(cross(cb,nor),pb)) +
     sign(dot(cross(ac,nor),pc)) < 2.0)
     ?
     min( min(
     dot2(ba*clamp(dot(ba,pa)/dot2(ba),0.0,1.0)-pa),
     dot2(cb*clamp(dot(cb,pb)/dot2(cb),0.0,1.0)-pb) ),
     dot2(ac*clamp(dot(ac,pc)/dot2(ac),0.0,1.0)-pc) )
     :
     dot(nor,pa)*dot(nor,pa)/dot2(nor) );
    return makeSDF(d, surface);
}

SDF udQuad( vec3 p, Surface surface, vec3 a, vec3 b, vec3 c, vec3 d ) {
    vec3 ba = b - a; vec3 pa = p - a;
    vec3 cb = c - b; vec3 pb = p - b;
    vec3 dc = d - c; vec3 pc = p - c;
    vec3 ad = a - d; vec3 pd = p - d;
    vec3 nor = cross( ba, ad );
    float dist = sqrt(
    (sign(dot(cross(ba,nor),pa)) +
     sign(dot(cross(cb,nor),pb)) +
     sign(dot(cross(dc,nor),pc)) +
     sign(dot(cross(ad,nor),pd)) < 3.0)
     ?
     min( min( min(
     dot2(ba*clamp(dot(ba,pa)/dot2(ba),0.0,1.0)-pa),
     dot2(cb*clamp(dot(cb,pb)/dot2(cb),0.0,1.0)-pb) ),
     dot2(dc*clamp(dot(dc,pc)/dot2(dc),0.0,1.0)-pc) ),
     dot2(ad*clamp(dot(ad,pd)/dot2(ad),0.0,1.0)-pd) )
     :
     dot(nor,pa)*dot(nor,pa)/dot2(nor) );
    return makeSDF(dist, surface);
}

SDF sdEllipsoid( vec3 p, Surface surface, vec3 r ) {
    float k0 = length(p/r);
    float k1 = length(p/(r*r));
    return makeSDF(k0*(k0-1.0)/k1, surface);
}

SDF sdScene(vec3 position) {
    SDF scene = makeSDF(MAX_DIST_TO_TRAVEL, makeSurface(vec3(0.0), 1.0, 0.0, 0.0));

    ${scene}

    return scene;
}

SDF rayMarch(vec3 rayOrigin, vec3 rayDirection) {
    float distanceTravelled = 0.0;
    SDF closestObject;

    for (float i = 0.0; i < MAXIMUM_RAY_STEPS; i++) {
        vec3 currentPosition = rayOrigin + rayDirection * distanceTravelled;
        closestObject = sdScene(currentPosition);

        if (closestObject.signedDistance < MIN_DISTANCE_TO_SURFACE) {
            break;
        }

        distanceTravelled += closestObject.signedDistance;

        if (distanceTravelled > MAX_DIST_TO_TRAVEL) {
            break;
        }
        closestObject.stepCount = i;
    }

    closestObject.signedDistance = distanceTravelled;
    return closestObject;
}

vec3 getNormal(vec3 p) {
    vec2 epsilon = vec2(0.01, 0.0);
    float gradX = sdScene(p + epsilon.xyy).signedDistance - sdScene(p - epsilon.xyy).signedDistance;
    float gradY = sdScene(p + epsilon.yxy).signedDistance - sdScene(p - epsilon.yxy).signedDistance;
    float gradZ = sdScene(p + epsilon.yyx).signedDistance - sdScene(p - epsilon.yyx).signedDistance;
    return normalize(vec3(gradX, gradY, gradZ));
}

vec3 calculateSurfaceLighting(vec3 hitPosition, vec3 rayDirection, SDF hitObject) {
    vec3 lightDirection = normalize(vec3(0.5, 1.0, -0.6));
    vec3 surfaceNormal = getNormal(hitPosition);
    vec3 viewDirection = -rayDirection;
    vec3 reflectionDirection = reflect(-lightDirection, surfaceNormal);

    float diffuseIntensity = clamp(dot(surfaceNormal, lightDirection), 0.0, 1.0);
    vec3 diffuse = hitObject.material.diffuseColor * diffuseIntensity * (1.0 - hitObject.material.metallicity);

    float shininess = exp((1.0 - hitObject.material.roughness) * 5.0);
    float specularIntensity = pow(clamp(dot(reflectionDirection, viewDirection), 0.0, 1.0), shininess);
    
    vec3 specularColor = mix(vec3(1.0), hitObject.material.diffuseColor, hitObject.material.metallicity);
    vec3 specular = specularColor * specularIntensity * (1.0 - hitObject.material.roughness);

    vec3 emission = hitObject.material.diffuseColor * hitObject.material.emission;

    vec3 ambient = hitObject.material.diffuseColor * 0.05;

    return ambient + diffuse + specular + emission;
}

vec3 render(vec2 uv) {
    vec3 rayOrigin = cameraPosition;
    vec3 rayDirection = normalize(vec3(uv, 1.0 / tan(radians(FIELD_OF_VIEW) / 2.0)));
    rayDirection = cameraViewMatrix * rayDirection;

    SDF hitObject = rayMarch(rayOrigin, rayDirection);
    
    vec3 backgroundColor = vec3(0.5, 0.8, 0.9);

    if (hitObject.signedDistance < MAX_DIST_TO_TRAVEL) {
        vec3 hitPosition = rayOrigin + rayDirection * hitObject.signedDistance;
    
        vec3 finalColor = calculateSurfaceLighting(hitPosition, rayDirection, hitObject);
        
        return mix(finalColor, backgroundColor, 1.0 - exp(-0.0008 * hitObject.signedDistance * hitObject.signedDistance));
    }
    
    return backgroundColor;
}

void main() {
    vec2 res = (u_resolution.x > 0.0) ? u_resolution : vec2(1920.0, 1080.0);
    float aspectRatio = res.x / res.y;
    vec2 uv = (gl_FragCoord.xy / res.xy) * 2.0 - 1.0;
    uv.x *= aspectRatio;
    
    outColor = vec4(render(uv), 1.0);
    outColor.rgb = pow(outColor.rgb, vec3(1.0 / 2.2));
}`
}

function startLoop() {
    function update(totalTime: number) {
        if (graphics) {
            const seconds = totalTime / 1000;
            
            graphics.updateUniforms(seconds);
            
            graphics.draw();
        }
        
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

startLoop();