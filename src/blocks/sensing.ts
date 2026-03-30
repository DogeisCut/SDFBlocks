import * as Blockly from "blockly";
import * as BlocklyWebGL from "../generators/webgl";

Blockly.Blocks["sensing_timer"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField("timer")
        this.setOutput(true, "Number")
        this.setStyle("sensing_blocks");
    },
};



BlocklyWebGL.webGLGenerator.forBlock["sensing_timer"] = function (block, generator) {
    return `\n`;
};