import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["transforms_current_position"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("current position")
        this.setOutput(true, "Vector3")
        this.setStyle("transforms_blocks");
    },
};

Blockly.Blocks["transforms_set"] = {
  init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.setNextStatement(true, "default");
        this.setPreviousStatement(true, "default");
        this.appendDummyInput().appendField("set current position")
        this.appendValueInput("VECTOR").setCheck("Vector3").appendField("to:")
        this.setStyle("transforms_blocks");
    },
};

Blockly.Blocks["transforms_translate"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("translate")
        this.appendValueInput("BY").setCheck("Vector3").appendField("by:")
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("position:")
        this.setOutput(true, "Vector3")
        this.setStyle("transforms_blocks");
    },
};


Blockly.Blocks["transforms_rotate_around_axis"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["transforms_repeat"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["transforms_twist"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["transforms_bend"] = {
    init: function (this: Blockly.Block) {
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["transforms_current_position"] = function (block, generator) {
    return ['position', BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["transforms_set"] = function (block, generator) {
    const VECTOR = generator.valueToCode(block, "VECTOR", BlocklyGLSL.Order.ATOMIC)
    return `position = ${VECTOR};`;
};

BlocklyGLSL.gLSLGenerator.forBlock["transforms_translate"] = function (block, generator) {
    const BY = generator.valueToCode(block, "BY", BlocklyGLSL.Order.ATOMIC)
    const POSITION = generator.valueToCode(block, "POSITION", BlocklyGLSL.Order.ATOMIC)
    return [`opTranslate(${POSITION}, ${BY})`, BlocklyGLSL.Order.NONE]
};
