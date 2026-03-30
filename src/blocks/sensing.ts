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

Blockly.Blocks["sensing_set_camera_position"] = {
    init: function () {
    },
};

Blockly.Blocks["sensing_set_camera_angle"] = {
    init: function () {
    },
};

Blockly.Blocks["sensing_camera_position"] = {
    init: function () {
    },
};

Blockly.Blocks["sensing_camera_angle"] = {
    init: function () {
    },
};

Blockly.Blocks["sensing_resolution"] = {
    init: function () {
    },
};

Blockly.Blocks["sensing_fragment_coord"] = {
    init: function () {
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["sensing_timer"] = function (block, generator) {
    return [`u_time`, BlocklyGLSL.Order.NONE];
};