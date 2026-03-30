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



BlocklyGLSL.gLSLGenerator.forBlock["primatives_nothing"] = function (block, generator) {
    return [`position`, BlocklyGLSL.Order.NONE]
};

BlocklyGLSL.gLSLGenerator.forBlock["primatives_sphere"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyGLSL.Order.ATOMIC)
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyGLSL.Order.ATOMIC)
    return [`sdSphere(${SURFACE}, ${RADIUS})`, BlocklyGLSL.Order.NONE]
};
