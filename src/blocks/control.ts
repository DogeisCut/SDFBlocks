import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["control_if"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if")
        this.appendDummyInput().appendField("then")
        this.appendStatementInput("DO").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_if_else"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if")
        this.appendDummyInput().appendField("then")
        this.appendStatementInput("DO").setCheck("default")
        this.appendDummyInput().appendField("else")
        this.appendStatementInput("ELSE").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_repeat"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("TIMES").setCheck("Number").appendField("repeat")
        this.appendStatementInput("DO").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_while"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("while")
        this.appendStatementInput("DO").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_do_while"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendDummyInput().appendField("do")
        this.appendStatementInput("DO").setCheck("default")
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("while")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_loop_index"] = {
    init: function () {
        this.setInputsInline(true);
        this.setOutput(true, "Number")
        this.appendDummyInput().appendField("loop index")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_continue"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.appendDummyInput().appendField("continue")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_break"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.appendDummyInput().appendField("break")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_discard"] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.appendDummyInput().appendField("discard")
        this.setStyle("control_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["control_if"] = function (block, generator) {
    const CONDITION = generator.valueToCode(block, "CONDITION", BlocklyGLSL.Order.ATOMIC) || false
    const DO = generator.statementToCode(block, "DO")
    return `if (${CONDITION}) {\n${DO}\n}`;
};

BlocklyGLSL.gLSLGenerator.forBlock["control_if_else"] = function (block, generator) {
    const CONDITION = generator.valueToCode(block, "CONDITION", BlocklyGLSL.Order.ATOMIC) || false
    const DO = generator.statementToCode(block, "DO")
    const ELSE = generator.statementToCode(block, "ELSE")
    return `if (${CONDITION}) {\n${DO}\n} else {\n${ELSE}\n}`;
};