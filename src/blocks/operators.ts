import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

const binaryOperatorCheck = ["Number", "Vector2", "Vector3", "Vector4", "Color"]

Blockly.Blocks["operators_add"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(binaryOperatorCheck);
        this.appendValueInput("B").setCheck(binaryOperatorCheck).appendField("+");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
    onchange: function (this: Blockly.BlockSvg) {
        const aInput = this.getInput("A")
        const bInput = this.getInput("B")
        if (!aInput || !bInput) {
            return
        }
        const aConnection = aInput.connection
        const bConnection = bInput.connection
        if (!aConnection || !bConnection) {
            return
        }
        const aBlock = aConnection.targetBlock()
        const bBlock = bConnection.targetBlock()
        if (!aBlock || !bBlock) {
            return
        }
        const aBlockConnection = aBlock.outputConnection
        const bBlockConnection = bBlock.outputConnection
        if (!aBlockConnection || !bBlockConnection) {
            return
        }
        const aCurrentCheck = aBlockConnection.getCheck()
        const bCurrentCheck = bBlockConnection.getCheck()

        // Yeah hardcoding this cause im LAZAYYYYYY
        // basically for each of these its like "okay, im (A) a number, and the other one (B) is a number, so we should return a number"
        // it also acts as a "ok im (A) a Vector2, which means the other one (B) can only be a Vector2 or Color"
        const aInputTypeMap = {
            "Number": { "Number": "Number" },
            "Vector2": { "Vector2": "Vector2", "Color": "Vector2" },
            "Vector3": { "Vector3": "Vector3" },
            "Vector4": { "Vector4": "Vector4" },
            "Color": { "Color": "Color", "Vector2": "Color" },
        }
        const bInputTypeMap = {
            "Number": { "Number": "Number" },
            "Vector2": { "Vector2": "Vector2", "Color": "Color" },
            "Vector3": { "Vector3": "Vector3" },
            "Vector4": { "Vector4": "Vector4" },
            "Color": { "Color": "Color", "Vector2": "Vector2" },
        }
        // btw it should only start checking only once one of the inputs arent a shadows. using the nessiary input type map to change
        // the other input and the output.

        const typeToShadowMap = {
            "Number": "values_number",
            "Vector2": "values_vector2",
            "Vector3": "values_vector3",
            "Vector4": "values_vector4",
            "Color": "values_color"
        }

        function updateShadows(to: string) {

        }
    }
};

Blockly.Blocks["operators_subtract"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(binaryOperatorCheck);
        this.appendValueInput("B").setCheck(binaryOperatorCheck).appendField("-");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_multiply"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(binaryOperatorCheck);
        this.appendValueInput("B").setCheck(binaryOperatorCheck).appendField("*");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_divide"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(binaryOperatorCheck);
        this.appendValueInput("B").setCheck(binaryOperatorCheck).appendField("/");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_power"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("^");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_modulus"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("mod");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_rounding"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField(
            new Blockly.FieldDropdown(
                [
                    ["round","round"],
                    ["ceilling", "ceil"],
                    ["floor", "floor"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};


Blockly.Blocks["operators_trig"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField(
            new Blockly.FieldDropdown(
                [
                    ["sine of","sin"],
                    ["cosine of", "cos"],
                    ["tangent of", "tan"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_unary"] = { // square root of, fractional of, negate, absolute value of, sign of, exp, log, exp2, log2
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField(
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
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_mix"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number").appendField("mix");
        this.appendValueInput("B").setCheck("Number").appendField("and");
        this.appendValueInput("BY").setCheck("Number").appendField("by");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_bounds"] = { // min and max
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number").appendField(
            new Blockly.FieldDropdown(
                [
                    ["max of", "max"],
                    ["min of", "min"],
                ]
            ),
            "OPERATION");
        this.appendValueInput("B").setCheck("Number").appendField("and");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_clamp"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField("clamp");
        this.appendValueInput("MIN").setCheck("Number").appendField("between");
        this.appendValueInput("MAX").setCheck("Number").appendField("and");
        this.setOutput(true, "Number");
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