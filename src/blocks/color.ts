import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";
import {FieldColourHsvSliders} from '@blockly/field-colour-hsv-sliders';


Blockly.Blocks["color_color"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("color").appendField(new FieldColourHsvSliders("#ff0000"), "COLOR")
        this.setOutput(true, ["Color", "Vector3"])
        this.setStyle("color_blocks");
    },
};

Blockly.Blocks["color_r_g_b"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("R").setCheck("Number").appendField("r:")
        this.appendValueInput("G").setCheck("Number").appendField("g:")
        this.appendValueInput("B").setCheck("Number").appendField("b:")
        this.setOutput(true, ["Color", "Vector3"])
        this.setStyle("color_blocks");
    },
};

Blockly.Blocks["color_h_s_v"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("H").setCheck("Number").appendField("h:")
        this.appendValueInput("S").setCheck("Number").appendField("s:")
        this.appendValueInput("V").setCheck("Number").appendField("v:")
        this.setOutput(true, ["Color", "Vector3"])
        this.setStyle("color_blocks");
    },
};

Blockly.Blocks["color_hex"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("hex").appendField(new Blockly.FieldTextInput("#ff0000"), "COLOR") // TODO: validator
        this.setOutput(true, ["Color", "Vector3"])
        this.setStyle("color_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["color_hex"] = function (block, generator) {
    function hexToRgb(hex: string) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    const COLOR = block.getFieldValue("COLOR");
    const convertedColor = hexToRgb(COLOR) ?? { r: 0, g: 0, b: 0 }
    return [`vec3(float(${convertedColor.r/255}), float(${convertedColor.g/255}), float(${convertedColor.b/255}))`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["color_color"] = function (block, generator) {
    function hexToRgb(hex: string) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    const COLOR = block.getFieldValue("COLOR");
    const convertedColor = hexToRgb(COLOR) ?? { r: 0, g: 0, b: 0 }
    return [`vec3(float(${convertedColor.r/255}), float(${convertedColor.g/255}), float(${convertedColor.b/255}))`, BlocklyGLSL.Order.NONE];
};
