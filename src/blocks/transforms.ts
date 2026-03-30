import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

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



BlocklyGLSL.gLSLGenerator.forBlock["transfoms_current_transform"] = function (block, generator) {
    return [`position`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["transforms_translate"] = function (block, generator) {
    const SDF = generator.valueToCode(block, "SDF", BlocklyGLSL.Order.ATOMIC)
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC)
    return [`opTranslate(${SDF}, ${POSITION})`, BlocklyGLSL.Order.NONE];
};
