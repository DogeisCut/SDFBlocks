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