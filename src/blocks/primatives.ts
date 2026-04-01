import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["primatives_nothing"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("nothing");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create sphere");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_box"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create box");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("SIZE").setCheck("Vector3").appendField("size:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_round_box"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create round box");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("SIZE").setCheck("Vector3").appendField("size:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_box_frame"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create box frame");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("SIZE").setCheck("Vector3").appendField("size:");
        this.appendValueInput("THICKNESS").setCheck("Number").appendField("thickness:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_torus"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create torus");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADII").setCheck("Vector2").appendField("radii:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_capped_torus"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create capped torus");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADII").setCheck("Vector2").appendField("radii:");
        this.appendValueInput("START").setCheck("Number").appendField("start angle:");
        this.appendValueInput("END").setCheck("Number").appendField("end angle:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_link"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create link");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("LENGTH").setCheck("Number").appendField("length:");
        this.appendValueInput("RADIUS1").setCheck("Number").appendField("radius 1:");
        this.appendValueInput("RADIUS2").setCheck("Number").appendField("radius 2:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_infinite_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create infinite cylinder");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_vertical_capped_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create vertical capped cylinder");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_arbitrary_capped_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create arbitrary capped cylinder");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("POINT_A").setCheck("Vector3").appendField("point a:");
        this.appendValueInput("POINT_B").setCheck("Vector3").appendField("point b:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_rounded_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create rounded cylinder");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("CORNER_RADIUS").setCheck("Number").appendField("corner radius:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create cone");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("ANGLE").setCheck("Number").appendField("angle:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_infinite_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create infinite cone");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("ANGLE").setCheck("Number").appendField("angle:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_simple_capped_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create simple capped cone");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("RADIUS1").setCheck("Number").appendField("radius 1:");
        this.appendValueInput("RADIUS2").setCheck("Number").appendField("radius 2:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_capped_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create arbitrary capped cone");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("POINT_A").setCheck("Vector3").appendField("point a:");
        this.appendValueInput("POINT_B").setCheck("Vector3").appendField("point b:");
        this.appendValueInput("RADIUS1").setCheck("Number").appendField("radius 1:");
        this.appendValueInput("RADIUS2").setCheck("Number").appendField("radius 2:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_simple_round_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create simple round cone");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("RADIUS1").setCheck("Number").appendField("radius 1:");
        this.appendValueInput("RADIUS2").setCheck("Number").appendField("radius 2:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_round_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create arbitrary round cone");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("POINT_A").setCheck("Vector3").appendField("point a:");
        this.appendValueInput("POINT_B").setCheck("Vector3").appendField("point b:");
        this.appendValueInput("RADIUS1").setCheck("Number").appendField("radius 1:");
        this.appendValueInput("RADIUS2").setCheck("Number").appendField("radius 2:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_capsule"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create capsule");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("POINT_A").setCheck("Vector3").appendField("point a:");
        this.appendValueInput("POINT_B").setCheck("Vector3").appendField("point b:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_vertical_capsule"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create vertical capsule");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_plane"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create plane");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("NORMAL").setCheck("Vector3").appendField("normal:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height offset:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_hexagonal_prism"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create hexagonal prism");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("EXTENT").setCheck("Vector2").appendField("extent:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_triangular_prism"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create triangular prism");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("EXTENT").setCheck("Vector2").appendField("extent:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_solid_angle"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create solid angle");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("ANGLE").setCheck("Number").appendField("angle:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_cut_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create cut sphere");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("CUT_HEIGHT").setCheck("Number").appendField("cut height:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_cut_hollow_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create cut hollow sphere");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("CUT_HEIGHT").setCheck("Number").appendField("cut height:");
        this.appendValueInput("THICKNESS").setCheck("Number").appendField("thickness:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_pitted_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create pitted sphere");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:");
        this.appendValueInput("PIT_RADIUS").setCheck("Number").appendField("pit radius:");
        this.appendValueInput("PIT_DEPTH").setCheck("Number").appendField("pit depth offset:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_vesica_segment"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create vesica segment");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("POINT_A").setCheck("Vector3").appendField("point a:");
        this.appendValueInput("POINT_B").setCheck("Vector3").appendField("point b:");
        this.appendValueInput("WIDTH").setCheck("Number").appendField("width:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_rhombus"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create rhombus");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("LA").setCheck("Number").appendField("length a:");
        this.appendValueInput("LB").setCheck("Number").appendField("length b:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("RADIUS").setCheck("Number").appendField("corner radius:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_octahedron"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create octahedron");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("SIZE").setCheck("Number").appendField("size:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_pyramid"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create pyramid");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_triangle"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create triangle");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("POINT_A").setCheck("Vector3").appendField("point a:");
        this.appendValueInput("POINT_B").setCheck("Vector3").appendField("point b:");
        this.appendValueInput("POINT_C").setCheck("Vector3").appendField("point c:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_quad"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create quad");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("POINT_A").setCheck("Vector3").appendField("point a:");
        this.appendValueInput("POINT_B").setCheck("Vector3").appendField("point b:");
        this.appendValueInput("POINT_C").setCheck("Vector3").appendField("point c:");
        this.appendValueInput("POINT_D").setCheck("Vector3").appendField("point d:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_ellipsoid"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create ellipsoid");
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:");
        this.appendValueInput("RADII").setCheck("Vector3").appendField("radii:");
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:");
        this.setOutput(true, "SDF");
        this.setStyle("primatives_blocks");
    },
};




BlocklyGLSL.gLSLGenerator.forBlock["primatives_nothing"] = function () {
    return [`makeSDF(MAX_DIST_TO_TRAVEL, makeSurface(vec3(0.0), 1.0, 0.0, 0.0))`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_sphere"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdSphere(${POSITION}, ${SURFACE}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_box"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const SIZE = generator.valueToCode(block, "SIZE", BlocklyGLSL.Order.ATOMIC);
    return [`sdBox(${POSITION}, ${SURFACE}, ${SIZE})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_round_box"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const SIZE = generator.valueToCode(block, "SIZE", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdRoundBox(${POSITION}, ${SURFACE}, ${SIZE}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_box_frame"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const SIZE = generator.valueToCode(block, "SIZE", BlocklyGLSL.Order.ATOMIC);
    const THICKNESS = generator.valueToCode(block, "THICKNESS", BlocklyGLSL.Order.ATOMIC);
    return [`sdBoxFrame(${POSITION}, ${SURFACE}, ${SIZE}, ${THICKNESS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_torus"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADII = generator.valueToCode(block, "RADII", BlocklyGLSL.Order.ATOMIC);
    return [`sdTorus(${POSITION}, ${SURFACE}, ${RADII})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_capped_torus"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADII = generator.valueToCode(block, "RADII", BlocklyGLSL.Order.ATOMIC);
    const START = generator.valueToCode(block, "START", BlocklyGLSL.Order.ATOMIC);
    const END = generator.valueToCode(block, "END", BlocklyGLSL.Order.ATOMIC);
    return [`sdCappedTorus(${POSITION}, ${SURFACE}, ${RADII}, ${START}, ${END})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_link"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const LENGTH = generator.valueToCode(block, "LENGTH", BlocklyGLSL.Order.ATOMIC);
    const RADIUS1 = generator.valueToCode(block, "RADIUS1", BlocklyGLSL.Order.ATOMIC);
    const RADIUS2 = generator.valueToCode(block, "RADIUS2", BlocklyGLSL.Order.ATOMIC);
    return [`sdLink(${POSITION}, ${SURFACE}, ${LENGTH}, ${RADIUS1}, ${RADIUS2})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_infinite_cylinder"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdCylinder(${POSITION}, ${SURFACE}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_cone"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const ANGLE = generator.valueToCode(block, "ANGLE", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    return [`sdCone(${POSITION}, ${SURFACE}, ${ANGLE}, ${HEIGHT})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_infinite_cone"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const ANGLE = generator.valueToCode(block, "ANGLE", BlocklyGLSL.Order.ATOMIC);
    return [`sdInfCone(${POSITION}, ${SURFACE}, ${ANGLE})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_plane"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const NORMAL = generator.valueToCode(block, "NORMAL", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    return [`sdPlane(${POSITION}, ${SURFACE}, ${NORMAL}, ${HEIGHT})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_hexagonal_prism"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const EXTENT = generator.valueToCode(block, "EXTENT", BlocklyGLSL.Order.ATOMIC);
    return [`sdHexPrism(${POSITION}, ${SURFACE}, ${EXTENT})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_capsule"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const POINT_A = generator.valueToCode(block, "POINT_A", BlocklyGLSL.Order.ATOMIC);
    const POINT_B = generator.valueToCode(block, "POINT_B", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdCapsule(${POSITION}, ${SURFACE}, ${POINT_A}, ${POINT_B}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_vertical_capsule"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdVerticalCapsule(${POSITION}, ${SURFACE}, ${HEIGHT}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_vertical_capped_cylinder"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdVerticalCappedCylinder(${POSITION}, ${SURFACE}, ${HEIGHT}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_arbitrary_capped_cylinder"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const POINT_A = generator.valueToCode(block, "POINT_A", BlocklyGLSL.Order.ATOMIC);
    const POINT_B = generator.valueToCode(block, "POINT_B", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdArbitraryCappedCylinder(${POSITION}, ${SURFACE}, ${POINT_A}, ${POINT_B}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_rounded_cylinder"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    const CORNER_RADIUS = generator.valueToCode(block, "CORNER_RADIUS", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    return [`sdRoundedCylinder(${POSITION}, ${SURFACE}, ${RADIUS}, ${CORNER_RADIUS}, ${HEIGHT})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_simple_capped_cone"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    const RADIUS1 = generator.valueToCode(block, "RADIUS1", BlocklyGLSL.Order.ATOMIC);
    const RADIUS2 = generator.valueToCode(block, "RADIUS2", BlocklyGLSL.Order.ATOMIC);
    return [`sdSimpleCappedCone(${POSITION}, ${SURFACE}, ${HEIGHT}, ${RADIUS1}, ${RADIUS2})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_capped_cone"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const POINT_A = generator.valueToCode(block, "POINT_A", BlocklyGLSL.Order.ATOMIC);
    const POINT_B = generator.valueToCode(block, "POINT_B", BlocklyGLSL.Order.ATOMIC);
    const RADIUS1 = generator.valueToCode(block, "RADIUS1", BlocklyGLSL.Order.ATOMIC);
    const RADIUS2 = generator.valueToCode(block, "RADIUS2", BlocklyGLSL.Order.ATOMIC);
    return [`sdCappedCone(${POSITION}, ${SURFACE}, ${POINT_A}, ${POINT_B}, ${RADIUS1}, ${RADIUS2})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_solid_angle"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const ANGLE = generator.valueToCode(block, "ANGLE", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdSolidAngle(${POSITION}, ${SURFACE}, ${ANGLE}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_cut_sphere"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    const CUT_HEIGHT = generator.valueToCode(block, "CUT_HEIGHT", BlocklyGLSL.Order.ATOMIC);
    return [`sdCutSphere(${POSITION}, ${SURFACE}, ${RADIUS}, ${CUT_HEIGHT})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_cut_hollow_sphere"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    const CUT_HEIGHT = generator.valueToCode(block, "CUT_HEIGHT", BlocklyGLSL.Order.ATOMIC);
    const THICKNESS = generator.valueToCode(block, "THICKNESS", BlocklyGLSL.Order.ATOMIC);
    return [`sdCutHollowSphere(${POSITION}, ${SURFACE}, ${RADIUS}, ${CUT_HEIGHT}, ${THICKNESS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_pitted_sphere"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    const PIT_RADIUS = generator.valueToCode(block, "PIT_RADIUS", BlocklyGLSL.Order.ATOMIC);
    const PIT_DEPTH = generator.valueToCode(block, "PIT_DEPTH", BlocklyGLSL.Order.ATOMIC);
    return [`sdDeathStar(${POSITION}, ${SURFACE}, ${RADIUS}, ${PIT_RADIUS}, ${PIT_DEPTH})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_simple_round_cone"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    const RADIUS1 = generator.valueToCode(block, "RADIUS1", BlocklyGLSL.Order.ATOMIC);
    const RADIUS2 = generator.valueToCode(block, "RADIUS2", BlocklyGLSL.Order.ATOMIC);
    return [`sdSimpleRoundCone(${POSITION}, ${SURFACE}, ${HEIGHT}, ${RADIUS1}, ${RADIUS2})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_round_cone"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const POINT_A = generator.valueToCode(block, "POINT_A", BlocklyGLSL.Order.ATOMIC);
    const POINT_B = generator.valueToCode(block, "POINT_B", BlocklyGLSL.Order.ATOMIC);
    const RADIUS1 = generator.valueToCode(block, "RADIUS1", BlocklyGLSL.Order.ATOMIC);
    const RADIUS2 = generator.valueToCode(block, "RADIUS2", BlocklyGLSL.Order.ATOMIC);
    return [`sdRoundCone(${POSITION}, ${SURFACE}, ${POINT_A}, ${POINT_B}, ${RADIUS1}, ${RADIUS2})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_vesica_segment"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const POINT_A = generator.valueToCode(block, "POINT_A", BlocklyGLSL.Order.ATOMIC);
    const POINT_B = generator.valueToCode(block, "POINT_B", BlocklyGLSL.Order.ATOMIC);
    const WIDTH = generator.valueToCode(block, "WIDTH", BlocklyGLSL.Order.ATOMIC);
    return [`sdVesicaSegment(${POSITION}, ${SURFACE}, ${POINT_A}, ${POINT_B}, ${WIDTH})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_rhombus"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const LA = generator.valueToCode(block, "LA", BlocklyGLSL.Order.ATOMIC);
    const LB = generator.valueToCode(block, "LB", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC);
    return [`sdRhombus(${POSITION}, ${SURFACE}, ${LA}, ${LB}, ${HEIGHT}, ${RADIUS})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_octahedron"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const SIZE = generator.valueToCode(block, "SIZE", BlocklyGLSL.Order.ATOMIC);
    return [`sdOctahedron(${POSITION}, ${SURFACE}, ${SIZE})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_pyramid"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const HEIGHT = generator.valueToCode(block, "HEIGHT", BlocklyGLSL.Order.ATOMIC);
    return [`sdPyramid(${POSITION}, ${SURFACE}, ${HEIGHT})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_triangle"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const POINT_A = generator.valueToCode(block, "POINT_A", BlocklyGLSL.Order.ATOMIC);
    const POINT_B = generator.valueToCode(block, "POINT_B", BlocklyGLSL.Order.ATOMIC);
    const POINT_C = generator.valueToCode(block, "POINT_C", BlocklyGLSL.Order.ATOMIC);
    return [`udTriangle(${POSITION}, ${SURFACE}, ${POINT_A}, ${POINT_B}, ${POINT_C})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_quad"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const POINT_A = generator.valueToCode(block, "POINT_A", BlocklyGLSL.Order.ATOMIC);
    const POINT_B = generator.valueToCode(block, "POINT_B", BlocklyGLSL.Order.ATOMIC);
    const POINT_C = generator.valueToCode(block, "POINT_C", BlocklyGLSL.Order.ATOMIC);
    const POINT_D = generator.valueToCode(block, "POINT_D", BlocklyGLSL.Order.ATOMIC);
    return [`udQuad(${POSITION}, ${SURFACE}, ${POINT_A}, ${POINT_B}, ${POINT_C}, ${POINT_D})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_ellipsoid"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const RADII = generator.valueToCode(block, "RADII", BlocklyGLSL.Order.ATOMIC);
    return [`sdEllipsoid(${POSITION}, ${SURFACE}, ${RADII})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_triangular_prism"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC);
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC);
    const EXTENT = generator.valueToCode(block, "EXTENT", BlocklyGLSL.Order.ATOMIC);
    return [`sdTriPrism(${POSITION}, ${SURFACE}, ${EXTENT})`, BlocklyGLSL.Order.NONE];
};