import * as Blockly from "blockly";
import * as BlocklyWebGL from "../generators/webgl";

Blockly.Blocks["transfoms_current_transform"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("current transform")
        this.setOutput(true, "Vector3")
        this.setStyle("transforms_blocks");
    },
};


Blockly.Blocks["transforms_translate"] = {
  init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("translate")
        this.appendValueInput("SDF").setCheck("SDF").appendField("sdf:")
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("by:")
        this.setOutput(true, "SDF")
        this.setStyle("transforms_blocks");
    },
};



BlocklyWebGL.webGLGenerator.forBlock["transfoms_current_transform"] = function (block, generator) {
    return [`position`, BlocklyWebGL.Order.NONE];
};

BlocklyWebGL.webGLGenerator.forBlock["transforms_translate"] = function (block, generator) {
    const SDF = generator.valueToCode(block, "SDF", BlocklyWebGL.Order.ATOMIC)
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyWebGL.Order.ATOMIC)
    return [`opTranslate(${SDF}, ${POSITION})`, BlocklyWebGL.Order.NONE];
};
