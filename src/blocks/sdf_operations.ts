import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["sdf_operations_union"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("union")
        this.appendValueInput("A").setCheck("SDF").appendField("A:")
        this.appendValueInput("B").setCheck("SDF").appendField("B:")
        this.setOutput(true, "SDF")
        this.setStyle("sdf_operations_blocks");
    },
};


Blockly.Blocks["sdf_operations_smooth_union"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("smooth union")
        this.appendValueInput("A").setCheck("SDF").appendField("A:")
        this.appendValueInput("B").setCheck("SDF").appendField("B:")
        this.appendValueInput("SMOOTHNESS").setCheck("Number").appendField("smoothness:")
        this.setOutput(true, "SDF")
        this.setStyle("sdf_operations_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["sdf_operations_union"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["sdf_operations_smooth_union"] = function (block, generator) {
    return `\n`;
};