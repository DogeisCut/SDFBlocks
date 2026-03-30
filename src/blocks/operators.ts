import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["operators_add"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("+");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_subtract"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("-");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_multiply"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("*");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_divide"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("/");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_power"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("^");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["operators_add"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["operators_subtract"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["operators_multiply"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["operators_divide"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["operators_power"] = function (block, generator) {
    return `\n`;
};