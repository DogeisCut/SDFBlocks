import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["sensing_timer"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField("timer")
        this.setOutput(true, "Number")
        this.setStyle("sensing_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["sensing_timer"] = function (block, generator) {
    return `\n`;
};