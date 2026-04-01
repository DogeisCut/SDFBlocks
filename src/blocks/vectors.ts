import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["vectors_vector2"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("X").setCheck("Number").appendField("x:")
        this.appendValueInput("Y").setCheck("Number").appendField("y:")
        this.setOutput(true, "Vector2")
        this.setStyle("vector2_blocks");
    },
};

Blockly.Blocks["vectors_vector3"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("X").setCheck("Number").appendField("x:")
        this.appendValueInput("Y").setCheck("Number").appendField("y:")
        this.appendValueInput("Z").setCheck("Number").appendField("z:")
        this.setOutput(true, "Vector3")
        this.setStyle("vector3_blocks");
    },
};

Blockly.Blocks["vectors_vector4"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("X").setCheck("Number").appendField("x:")
        this.appendValueInput("Y").setCheck("Number").appendField("y:")
        this.appendValueInput("Z").setCheck("Number").appendField("z:")
        this.appendValueInput("W").setCheck("Number").appendField("w:")
        this.setOutput(true, "Vector4")
        this.setStyle("vector4_blocks");
    },
};

Blockly.Blocks["vectors_x_of"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("VECTOR").setCheck(["Vector2", "Vector3", "Vector4"]).appendField("x of")
        this.setOutput(true, "Number")
        this.setStyle("vectors_blocks");
    },
};

Blockly.Blocks["vectors_y_of"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("VECTOR").setCheck(["Vector2", "Vector3", "Vector4"]).appendField("y of")
        this.setOutput(true, "Number")
        this.setStyle("vectors_blocks");
    },
};

Blockly.Blocks["vectors_z_of"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("VECTOR").setCheck(["Vector3", "Vector4"]).appendField("z of")
        this.setOutput(true, "Number")
        this.setStyle("vectors_blocks");
    },
};

Blockly.Blocks["vectors_w_of"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("VECTOR").setCheck("Vector4").appendField("w of")
        this.setOutput(true, "Number")
        this.setStyle("vectors_blocks");
    },
};

Blockly.Blocks["vectors_vector2_z"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["vectors_vector3_w"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["vectors_components2"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["vectors_components3"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["vectors_components4"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["vectors_length_of"] = {
    init: function (this: Blockly.Block) {
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["vectors_vector2"] = function (block, generator) {
    const X = generator.valueToCode(block, "X", BlocklyGLSL.Order.ATOMIC);
    const Y = block.getFieldValue("Y");
    return [`vec2(${X}, ${Y})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["vectors_vector3"] = function (block, generator) {
    const X = generator.valueToCode(block, "X", BlocklyGLSL.Order.ATOMIC);
    const Y = generator.valueToCode(block, "Y", BlocklyGLSL.Order.ATOMIC);
    const Z = generator.valueToCode(block, "Z", BlocklyGLSL.Order.ATOMIC);
    return [`vec3(${X}, ${Y}, ${Z})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["vectors_vector4"] = function (block, generator) {
    const X = generator.valueToCode(block, "X", BlocklyGLSL.Order.ATOMIC);
    const Y = generator.valueToCode(block, "Y", BlocklyGLSL.Order.ATOMIC);
    const Z = generator.valueToCode(block, "Z", BlocklyGLSL.Order.ATOMIC);
    const W = generator.valueToCode(block, "W", BlocklyGLSL.Order.ATOMIC);
    return [`vec3(${X}, ${Y}, ${Z}, ${W})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["vectors_x_of"] = function (block, generator) {
    const vec = generator.valueToCode(block, "VECTOR", BlocklyGLSL.Order.ATOMIC)
    return [`${vec}.x`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["vectors_y_of"] = function (block, generator) {
    const vec = generator.valueToCode(block, "VECTOR", BlocklyGLSL.Order.ATOMIC)
    return [`${vec}.y`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["vectors_z_of"] = function (block, generator) {
    const vec = generator.valueToCode(block, "VECTOR", BlocklyGLSL.Order.ATOMIC)
    return [`${vec}.z`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["vectors_w_of"] = function (block, generator) {
    const vec = generator.valueToCode(block, "VECTOR", BlocklyGLSL.Order.ATOMIC)
    return [`${vec}.w`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["vectors_length_of"] = function (block, generator) {
    const vec = generator.valueToCode(block, "VECTOR", BlocklyGLSL.Order.ATOMIC)
    return [`length(${vec})`, BlocklyGLSL.Order.NONE];
};