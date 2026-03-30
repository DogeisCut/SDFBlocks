import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

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



BlocklyJS.javascriptGenerator.forBlock["control_if"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["control_if_else"] = function (block, generator) {
    return `\n`;
};