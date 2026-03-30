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

Blockly.Blocks["primatives_plane"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_box"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_round_box"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_cone"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_torus"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_capsule"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_capped_cylinder"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_rounded_cylinder"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_round_cone"] = {
    init: function () {
    },
};

Blockly.Blocks["primatives_ellipsoid"] = {
    init: function () {
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
