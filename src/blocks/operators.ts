import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["operators_add"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("+");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_subtract"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("-");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_multiply"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("*");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_divide"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("/");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_power"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("^");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_modulus"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("mod");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_rounding"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
            new Blockly.FieldDropdown(
                [
                    ["round","round"],
                    ["ceilling", "ceil"],
                    ["floor", "floor"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};


Blockly.Blocks["operators_trig"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
            new Blockly.FieldDropdown(
                [
                    ["sine of","sin"],
                    ["cosine of", "cos"],
                    ["tangent of", "tan"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_unary"] = { // square root of, fractional of, negate, absolute value of, sign of, exp, log, exp2, log2
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
            new Blockly.FieldDropdown(
                [
                    ["square root of", "sqrt"],
                    ["fractional part of", "fract"],
                    ["negate", "-"],
                    ["absolute value of", "abs"],
                    ["sign of", "sign"],
                    ["logarithm of", "log"],
                    ["exp", "exp"],
                    ["exp2", "exp2"],
                    ["log2", "log2"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_mix"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("mix");
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("and");
        this.appendValueInput("BY").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("by");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_bounds"] = { // min and max
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
            new Blockly.FieldDropdown(
                [
                    ["max of", "max"],
                    ["min of", "min"],
                ]
            ),
            "OPERATION");
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("and");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_clamp"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("clamp");
        this.appendValueInput("MIN").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("between");
        this.appendValueInput("MAX").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("and");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_equals"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A");
        this.appendValueInput("B").appendField("=");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_not_equals"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A");
        this.appendValueInput("B").appendField("≠");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_less_than"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("<");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_less_than_or_equal"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("≤");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_greater_than"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField(">");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_greater_than_or_equal"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("≥");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_and"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField("and");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_or"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField("or");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_not"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("Boolean").setCheck("Boolean").appendField("not");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_true"] = { // these might not be neccisary with the checkbox value. though i hate the checkbox field in blockly so i might just shadow false instead
    init: function () {
        this.appendDummyInput().appendField("true")
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_false"] = {
    init: function () {
        this.appendDummyInput().appendField("false")
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["operators_add"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} + ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_subtract"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} - ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_multiply"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} * ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_divide"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} / ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_power"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`pow(${A}, ${B})`, BlocklyGLSL.Order.NONE];
};