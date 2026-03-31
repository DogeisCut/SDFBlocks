import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["primatives_nothing"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("nothing")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create sphere")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_box"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create box")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("SIZE").setCheck("Vector3").appendField("size:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_round_box"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create round box")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("SIZE").setCheck("Vector3").appendField("size:")
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_box_frame"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create box frame")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("SIZE").setCheck("Vector3").appendField("size:")
        this.appendValueInput("THICKNESS").setCheck("Number").appendField("thickness:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_torus"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create torus")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("RADII").setCheck("Vector2").appendField("radii:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_capped_torus"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create capped torus")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("RADII").setCheck("Vector2").appendField("radii:")
        this.appendValueInput("START").setCheck("Number").appendField("start:")
        this.appendValueInput("END").setCheck("Number").appendField("end:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_link"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create link")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_infinite_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create infinite cylinder")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create cone")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("ANGLES").setCheck("Vector2").appendField("angles:")
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_infinite_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create infinite cone")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_plane"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create plane")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("NORMAL").setCheck("Vector3").appendField("normal:")
        this.appendValueInput("HEIGHT").setCheck("Number").appendField("height:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_hexagonal_prism"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create hexagonal prism")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_capsule"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create capsule")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_vertical_capsule"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create vertical capsule")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_vertical_capped_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create vertical capped cylinder")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_arbitrary_capped_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create arbitrary capped cylinder")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_rounded_cylinder"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create rounded cylinder")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_simple_capped_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create simple capped cone")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_capped_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create capped cone")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_solid_angle"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create solid angle")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_cut_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create cut sphere")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_cut_hollow_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create cut hollow sphere")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_pitted_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create pitted sphere")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_simple_round_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create simple round cone")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_round_cone"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create round cone")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_vesica_segment"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create vesica segment")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_rhombus"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create rhombus")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_octahedron"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create octahedron")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_pyramid"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create pyramid")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_triangle"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create triangle")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_quad"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create quad")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_ellipsoid"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create ellipsoid")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};

Blockly.Blocks["primatives_triangular_prism"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create triangular prism")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.setOutput(true, "SDF")
        this.setStyle("primatives_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["primatives_nothing"] = function (block, generator) {
    return [`position`, BlocklyGLSL.Order.NONE]
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_sphere"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC)
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC)
    return [`sdSphere(position, ${SURFACE}, ${RADIUS})`, BlocklyGLSL.Order.NONE]
};
