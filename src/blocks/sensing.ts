import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["sensing_timer"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField("timer")
        this.setOutput(true, "Number")
        this.setStyle("sensing_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["sensing_timer"] = function (block, generator) {
    return `\n`;
};