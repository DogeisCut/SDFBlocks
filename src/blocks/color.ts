import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["color_r_g_b"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("R").setCheck("Number").appendField("r:")
        this.appendValueInput("G").setCheck("Number").appendField("g:")
        this.appendValueInput("B").setCheck("Number").appendField("b:")
        this.setOutput(true, "Color")
        this.setStyle("color_blocks");
    },
};

Blockly.Blocks["color_h_s_v"] = {
    init: function () {
    },
};

Blockly.Blocks["color_blend"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("blend colors")
        this.appendValueInput("A").setCheck("Color").appendField("a:")
        this.appendValueInput("B").setCheck("Color").appendField("b:")
        this.appendValueInput("BY").setCheck("Number").appendField("by:")
        this.setOutput(true, "Color")
        this.setStyle("color_blocks");
    },
};

Blockly.Blocks["color_get_r"] = {
    init: function () {
    },
};

Blockly.Blocks["color_get_g"] = {
    init: function () {
    },
};

Blockly.Blocks["color_get_b"] = {
    init: function () {
    },
};


