import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["color_blend"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("blend colors")
        this.appendValueInput("A").setCheck("Color").appendField("A:")
        this.appendValueInput("B").setCheck("Color").appendField("B:")
        this.appendValueInput("BY").setCheck("Number").appendField("by:")
        this.setOutput(true, "Color")
        this.setStyle("color_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["color_blend"] = function (block, generator) {
    return `\n`;
};