import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";
import {FieldColourHsvSliders} from '@blockly/field-colour-hsv-sliders';

Blockly.Blocks["values_color"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField(
            new FieldColourHsvSliders(),
            "COLOR"
        )
        this.setOutput(true, "Color");
        this.setStyle("values");
    },
};

Blockly.Blocks["values_float"] = {
    init() {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "NUMBER");
        this.setOutput(true, "Number");
        this.setStyle("values");
    }
};

Blockly.Blocks["values_unit_float"] = {
    init() {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0, 0, 1), "NUMBER");
        this.setOutput(true, "Number");
        this.setStyle("values");
    }
};

Blockly.Blocks["values_vector2"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("x:").appendField(new Blockly.FieldNumber(0), "X")
        this.appendDummyInput().appendField("y:").appendField(new Blockly.FieldNumber(0), "Y")
        this.setOutput(true, "Vector2")
        this.setStyle("vector2_blocks");
    },
};

Blockly.Blocks["values_vector3"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("x:").appendField(new Blockly.FieldNumber(0), "X")
        this.appendDummyInput().appendField("y:").appendField(new Blockly.FieldNumber(0), "Y")
        this.appendDummyInput().appendField("z:").appendField(new Blockly.FieldNumber(0), "Z")
        this.setOutput(true, "Vector3")
        this.setStyle("vector3_blocks");
    },
};

Blockly.Blocks["values_vector4"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("x:").appendField(new Blockly.FieldNumber(0), "X")
        this.appendDummyInput().appendField("y:").appendField(new Blockly.FieldNumber(0), "Y")
        this.appendDummyInput().appendField("z:").appendField(new Blockly.FieldNumber(0), "Z")
        this.appendDummyInput().appendField("w:").appendField(new Blockly.FieldNumber(0), "W")
        this.setOutput(true, "Vector4")
        this.setStyle("vector4_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["values_color"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["values_float"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["values_unit_float"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["values_vector2"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["values_vector3"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["values_vector4"] = function (block, generator) {
    return `\n`;
};