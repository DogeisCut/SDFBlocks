import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["sensing_timer"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("timer")
        this.setOutput(true, "Number")
        this.setStyle("sensing_blocks");
    },
};

Blockly.Blocks["sensing_camera_position"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("camera position")
        this.setOutput(true, "Vector3")
        this.setStyle("sensing_blocks");
    },
};

Blockly.Blocks["sensing_camera_angle"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("camera angle")
        this.setOutput(true, "Vector3")
        this.setStyle("sensing_blocks");
    },
};

Blockly.Blocks["sensing_resolution"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("resolution")
        this.setOutput(true, "Vector3")
        this.setStyle("sensing_blocks");
    },
};

Blockly.Blocks["sensing_fragment_coord"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("fragment coord")
        this.setOutput(true, "Vector3")
        this.setStyle("sensing_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["sensing_timer"] = function (block, generator) {
    return [`u_time`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["sensing_resolution"] = function (block, generator) {
    return [`u_resolution`, BlocklyGLSL.Order.NONE];
};