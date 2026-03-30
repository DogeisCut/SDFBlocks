import * as Blockly from "blockly";
import * as BlocklyGLSL from "./generators/glsl";

const codeDiv = document.getElementById('generatedCode')?.firstChild;
const outputDiv = document.getElementById('output');

// TODO: this is where the actual shader would be recompiled. But for now we just show the source.
// It doesn't matter if the source is ugly since the user will not be seeing it anyways.
export function compile(workspace: Blockly.Workspace) {
    const code = makeFragmentSource(BlocklyGLSL.gLSLGenerator.workspaceToCode(workspace));
    if (codeDiv) codeDiv.textContent = code;

    if (outputDiv) outputDiv.innerHTML = '';
};

// TODO: this is copy and pasted directly from another project; In order for this to function properly, the surfaces system must be modified and all ops need to take in the new system.
// In other words: this whole thing needs a refactor and will not work off the bat.
// Also there may be external paramaters such as all the config vars, clear color, etc. Additional work will be needed to make sure those blocks are compiled properly.
export function makeFragmentSource(scene: string) { 
    return `#version 300 es

    #define MIN_DIST_TO_SDF 0.0001
    #define MAX_DIST_TO_TRAVEL 1000.0
    #define NUM_OF_STEPS 1000.0
    #define FOV 75.0

    precision highp float;

    in vec4 pos4;
    out vec4 color;

    struct Surface {
        float signedDistanceValue;
        vec3 color;
        float roughness;
        float metallicity;
        float emission;
        float marches;
    };

    Surface makeSurface(float sdf, vec3 color, float roughness, float metallicity, float emission) {
        return Surface(sdf, color, roughness, metallicity, emission, 0.0);
    }

    Surface opUnion(Surface a, Surface b){
        if (b.signedDistanceValue < a.signedDistanceValue) return b;
        return a;
    }

    Surface opSmoothUnion(Surface s1, Surface s2, float k) {
        float h = clamp(0.5 + 0.5 * (s2.signedDistanceValue - s1.signedDistanceValue) / k, 0.0, 1.0);

        Surface result;
        result.signedDistanceValue = mix(s2.signedDistanceValue, s1.signedDistanceValue, h) - k * h * (1.0 - h);
        result.color = mix(s2.color, s1.color, h);
        result.roughness = mix(s2.roughness, s1.roughness, h);
        result.metallicity = mix(s2.metallicity, s1.metallicity, h);
        result.emission = mix(s2.emission, s1.emission, h);

        return result;
    }

    Surface opSubtraction(Surface a, Surface b) {
        //This is basically max(-a,b)
        Surface result;
        result.signedDistanceValue = max(-a.signedDistanceValue, b.signedDistanceValue);
        result.color = b.color;  // Keep the color of the subtracted object
        result.roughness = b.roughness;  // Keep the roughness of the subtracted object
        result.metallicity = b.metallicity;  // Keep the metallicity of the subtracted object
        result.emission = b.emission;  // Keep the emission of the subtracted object
        return result;
    }


    Surface opSmoothSubtraction(Surface s1, Surface s2, float k) {
        float h = clamp(0.5 - 0.5 * (s2.signedDistanceValue + s1.signedDistanceValue) / k, 0.0, 1.0);

        Surface result;
        result.signedDistanceValue = mix(s2.signedDistanceValue, -s1.signedDistanceValue, h) + k * h * (1.0 - h);
        result.color = s2.color;  // Keep the color of the subtracted object
        result.roughness = s2.roughness;  // Keep the roughness of the subtracted object
        result.metallicity = s2.metallicity;  // Keep the metallicity of the subtracted object
        result.emission = s2.emission;  // Keep the metallicity of the subtracted object

        return result;
    }

    Surface opIntersection(Surface a, Surface b) {
        //This is basically max(a,b)
        Surface result;
        result.signedDistanceValue = max(a.signedDistanceValue, b.signedDistanceValue);
        result.color = a.color;  // Keep the color of the intersected object
        result.roughness = a.roughness;  // Keep the roughness of the intersected object
        result.metallicity = a.metallicity;  // Keep the metallicity of the intersected object
        result.emission = a.emission;  // Keep the emission of the intersected object
        return result;
    }

    Surface opSmoothIntersection(Surface s1, Surface s2, float k) {
        float h = clamp(0.5 - 0.5 * (s2.signedDistanceValue + s1.signedDistanceValue) / k, 0.0, 1.0);

        Surface result;
        result.signedDistanceValue = mix(s2.signedDistanceValue, s1.signedDistanceValue, h) + k * h * (1.0 - h);
        result.color = mix(s2.color, s1.color, h);
        result.roughness = mix(s2.roughness, s1.roughness, h);
        result.metallicity = mix(s2.metallicity, s1.metallicity, h);
        result.emission = mix(s2.emission, s1.emission, h);

        return result;
    }

    Surface opPaint(Surface s1, Surface s2) {
        Surface result;
        result.signedDistanceValue = s2.signedDistanceValue;
        result.color = mix(s1.color, s2.color, step(0.0, s1.signedDistanceValue));
        result.roughness = mix(s1.roughness, s2.roughness, step(0.0, s1.signedDistanceValue));
        result.metallicity = mix(s1.metallicity, s2.metallicity, step(0.0, s1.signedDistanceValue));
        result.emission = mix(s1.emission, s2.emission, step(0.0, s1.signedDistanceValue));

        return result;
    }

    Surface opSmoothPaint(Surface s1, Surface s2, float k) {
        Surface result;
        float h = clamp(0.5 + 0.5 * (s1.signedDistanceValue - s2.signedDistanceValue) / k, 0.0, 1.0);

        result.signedDistanceValue = s2.signedDistanceValue;
        result.color = mix(s1.color, s2.color, h);
        result.roughness = mix(s1.roughness, s2.roughness, h);
        result.metallicity = mix(s1.metallicity, s2.metallicity, h);
        result.emission = mix(s1.emission, s2.emission, h);

        return result;
    }


    mat2 opRotate(float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(vec2(c, -s), vec2(s, c));
    }
    vec3 opRotateAxis(vec3 p, vec3 axis, float angle) {
        return mix(dot(axis, p) * axis, p, cos(angle))
                + cross(axis, p) * sin(angle);
    }
    vec3 opRepeat(vec3 p, vec3 c) {
        return mod(p, c) - 0.5 * c;
    }
    vec3 opTwist(vec3 p, float k) {
        float c = cos(k * p.y);
        float s = sin(k * p.y);
        mat2  m = mat2(vec2(c, -s), vec2(s, c));
        return vec3(m*p.xz, p.y);
    }
    vec3 opBend(vec3 p, float k) {
        float c = cos(k * p.x);
        float s = sin(k * p.x);
        mat2  m = mat2(vec2(c, -s), vec2(s, c));
        return vec3(m*p.xy, p.z);
    }


    float sdSphere(vec3 p, float radius) {
        return length(p) - radius;
    }

    float sdPlane( vec3 p, vec3 normal, float height ){
        return dot(p,normal) + height;
    }

    float sdBox(vec3 p, vec3 b) {
        vec3 q = abs(p) - b;
        return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
    }

    float sdRoundBox(vec3 p, vec3 b, float r) {
        vec3 q = abs(p) - b;
        return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
    }

    float sdCone(vec3 p, vec2 c, float h) {
        vec2 q = h * vec2(c.x / c.y, -1.0);

        vec2 w = vec2(length((p).xz), (p).y);
        vec2 a = w - q * clamp(dot(w, q) / dot(q, q), 0.0, 1.0);
        vec2 b = w - q * vec2(clamp(w.x / q.x, 0.0, 1.0), 1.0);
        float k = sign(q.y);
        float d = min(dot(a, a), dot(b, b));
        float s = max(k * (w.x * q.y - w.y * q.x), k * (w.y - q.y));
        return sqrt(d) * sign(s);
    }

    float sdTorus(vec3 p, vec2 t) {
        vec2 q = vec2(length((p).xz) - t.x, (p).y);
        return length(q) - t.y;
    }

    float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
        vec3 pa = p - a, ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return length(pa - ba * h) - r;
    }

    float sdCappedCylinder(vec3 p, vec3 a, vec3 b, float r) {
        vec3 ba = b - a;
        vec3 pa = p - a;
        float baba = dot(ba, ba);
        float paba = dot(pa, ba);
        float x = length(pa * baba - ba * paba) - r * baba;
        float y = abs(paba - baba * 0.5) - baba * 0.5;
        float x2 = x * x;
        float y2 = y * y * baba;
        float d = (max(x, y) < 0.0) ? -min(x2, y2) : (((x > 0.0) ? x2 : 0.0) + ((y > 0.0) ? y2 : 0.0));
        return sign(d) * sqrt(abs(d)) / baba;
    }

    float sdRoundedCylinder(vec3 p, float ra, float rb, float h) {
        vec2 d = vec2(length((p).xz) - 2.0 * ra + rb, abs((p).y) - h);
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - rb;
    }

    float sdRoundCone(vec3 p, float r1, float r2, float h) {
        float b = (r1 - r2) / h;
        float a = sqrt(1.0 - b * b);

        vec2 q = vec2(length((p).xz), (p).y);
        float k = dot(q, vec2(-b, a));
        if (k < 0.0)
            return length(q) - r1;
        if (k > a * h)
            return length(q - vec2(0.0, h)) - r2;
        return dot(q, vec2(a, b)) - r1;
    }

    float sdEllipsoid(vec3 p, vec3 r) {
        float k0 = length((p) / r);
        float k1 = length((p) / (r * r));
        return k0 * (k0 - 1.0) / k1;
    }


    Surface sdScene(vec3 position) {
        Surface scene;
        
        ${scene}

        return scene;
    }

    Surface rayMarch(vec3 rayOrigin, vec3 rayDirection, float maxDistToTravel) {
        float dist = 0.0;
        Surface closestObject;

        for (float i = 0.0; i < NUM_OF_STEPS; i++) {
            vec3 currentPos = rayOrigin + rayDirection * dist;
            closestObject = sdScene(currentPos);

            if (closestObject.signedDistanceValue < MIN_DIST_TO_SDF) {
                break;
            }

            dist = dist + closestObject.signedDistanceValue * 0.5;

            if (dist > maxDistToTravel) {
                break;
            }
            closestObject.marches = i;
        }

        closestObject.signedDistanceValue = dist;
        

        return closestObject;
    }

    vec3 getNormal(vec3 p) {
        vec2 d = vec2(0.01, 0.0);
        float gx = sdScene(p + d.xyy).signedDistanceValue - sdScene(p - d.xyy).signedDistanceValue;  
        float gy = sdScene(p + d.yxy).signedDistanceValue - sdScene(p - d.yxy).signedDistanceValue;
        float gz = sdScene(p + d.yyx).signedDistanceValue - sdScene(p - d.yyx).signedDistanceValue;
        vec3 normal = vec3(gx, gy, gz);
        return normalize(normal);
    }

    mat3 rotationMatrix(vec2 angles) {
        float cosA = cos(angles.x);
        float sinA = sin(angles.x);
        float cosB = cos(angles.y);
        float sinB = sin(angles.y);

        return mat3(
            cosB, 0.0, -sinB,
            sinA * sinB, cosA, sinA * cosB,
            cosA * sinB, -sinA, cosA * cosB
        );
    }

    vec3 getLight(vec3 p, vec3 rayDirection, Surface object) {

        //this is all totally faked, i prefer to do some actual pbr at some point
        //especially considering i want lights to be addable at some point
        //i mean come on, emissive objects above 1 dont even produce light
        //metallicity isnt even used (if i continue faking, it'll become reflectance)

        //todo: soft shadows

        vec3 lightPos = vec3(0.5, 1, -0.6)*100.0;
        vec3 L = normalize(lightPos);//-p);
        vec3 normal = getNormal(p);
        vec3 V = -rayDirection;
        vec3 R = reflect(-L, normal);

        vec3 specColor = vec3(1.0 - object.roughness);
        vec3 specular = specColor * pow(clamp(dot(R, V), 0.0, 1.0), exp((1.0 - object.roughness) * 4.605170185));
        vec3 diffuse = object.color * clamp(dot(L, normal), 0.0, 1.0);
        vec3 ambient = object.color * 0.05;
        vec3 fresnel = 0.25 * object.color * pow(1.0 + dot(rayDirection, normal), 3.0);

        //shadows
        Surface shadowObject = rayMarch(p + normal * 0.02, normalize(lightPos), MAX_DIST_TO_TRAVEL);
        float d = shadowObject.signedDistanceValue;
        if (d < length(lightPos - p)) return mix(ambient, object.color, object.emission);
        return mix((diffuse + ambient), object.color, object.emission) + specular + fresnel;
    }
        
    vec3 render(vec2 uv) {
        vec3 color = vec3(0.0);
        vec3 rayOrigin = u_camPos;
        vec3 rayDirection = normalize(vec3(uv, 1.0 / tan(radians(FOV) / 2.0)));
        rayDirection = u_camViewMatrix * rayDirection;

        Surface object = rayMarch(rayOrigin, rayDirection, MAX_DIST_TO_TRAVEL);
        float dist = object.signedDistanceValue;

        vec3 background = vec3(0.5,0.8,0.9);
        if (dist < MAX_DIST_TO_TRAVEL) {
            vec3 p = rayOrigin + rayDirection * dist;
            color += getLight(p, rayDirection, object);
            // fog
            color = mix(color, background, 1.0 - exp(-0.0008 * dist * dist));
        } else {
            color += background - max(0.7 * rayDirection.y, 0.0);
        }

        return color;
    }

    void main() {
        float aspectRatio = u_resolution.x / u_resolution.y;
        
        vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
        
        uv.x *= aspectRatio;
        
        color = vec4(render(uv), 1.0);
        
        //gamma correction
        color.rgb = pow(color.rgb, vec3(1.0 / 2.2));
    }`
}