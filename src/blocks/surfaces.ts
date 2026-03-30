import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["surfaces_generic_surface"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField("generic surface")
        this.setOutput(true, "Surface")
        this.setStyle("surfaces_blocks");
    },
};

Blockly.Blocks["surfaces_create_surface"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create surface")
        this.appendValueInput("COLOR").setCheck("Color").appendField("color:")
        this.appendValueInput("ROUGHNESS").setCheck("Number").appendField("roughness:")
        this.appendValueInput("METALLICITY").setCheck("Number").appendField("metallicity:")
        this.appendValueInput("EMISSION").setCheck("Number").appendField("emission:")
        this.setOutput(true, "Surface")
        this.setStyle("surfaces_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["surfaces_generic_surface"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["surfaces_create_surface"] = function (block, generator) {
    return `\n`;
};
