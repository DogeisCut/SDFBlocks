import * as Blockly from "blockly";
import * as BlocklyWebGL from "../generators/webgl";

Blockly.Blocks["sdfs_nothing"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("nothing")
        this.setOutput(true, "SDF")
        this.setStyle("sdfs_blocks");
    },
};

Blockly.Blocks["sdfs_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create sphere")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:")
        this.setOutput(true, "SDF")
        this.setStyle("sdfs_blocks");
    },
};



BlocklyWebGL.webGLGenerator.forBlock["sdfs_nothing"] = function (block, generator) {
    return [`position`, BlocklyWebGL.Order.NONE]
};

BlocklyWebGL.webGLGenerator.forBlock["sdfs_sphere"] = function (block, generator) {
    const SURFACE = generator.valueToCode(block, "SURFACE", BlocklyWebGL.Order.ATOMIC)
    const RADIUS = generator.valueToCode(block, "RADIUS", BlocklyWebGL.Order.ATOMIC)
    return [`sdSphere(${SURFACE}, ${RADIUS})`, BlocklyWebGL.Order.NONE]
};
