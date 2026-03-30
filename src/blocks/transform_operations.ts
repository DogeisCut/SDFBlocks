import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["transfom_operations_current_transform"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField("current transform")
        this.setOutput(true, "Vector3")
        this.setStyle("transform_operations_blocks");
    },
};


Blockly.Blocks["transform_operations_translate"] = {
  init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Transform") // May need additional checking to make sure this block is only placed sub within a transform block.
        this.setNextStatement(true, "Transform") // May need additional checking to make sure this block is only placed sub within a transform block.
        this.appendValueInput("POSITION").setCheck("Vector3").appendField("translate by")
        this.setStyle("transform_operations_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["transfom_operations_current_transform"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["transform_operations_translate"] = function (block, generator) {
    return `\n`;
};
