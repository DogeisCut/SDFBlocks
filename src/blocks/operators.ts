import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

type GLSLType = "Number" | "Vector2" | "Vector3" | "Vector4" | "Color";
const anyCheck: GLSLType[] = ["Number", "Vector2", "Vector3", "Vector4", "Color"];

const typeToShadowMap: Record<GLSLType, string> = {
    "Number": "values_float",
    "Vector2": "values_vector2",
    "Vector3": "values_vector3",
    "Vector4": "values_vector4",
    "Color": "values_color"
};

const updateShadow = (block: Blockly.BlockSvg, inputName: string, targetType: GLSLType) => {
    const input = block.getInput(inputName);
    if (!input || !input.connection) return;

    const currentTarget = input.connection.targetBlock();
    const shadowType = typeToShadowMap[targetType];

    if (!currentTarget || (currentTarget.isShadow() && currentTarget.type !== shadowType)) {
        
        if (currentTarget) {
            currentTarget.dispose(false);
        }

        const newShadow = block.workspace.newBlock(shadowType);
        newShadow.setShadow(true);
        newShadow.initSvg(); 

        const shadowConn = newShadow.outputConnection;
        if (shadowConn) {
            input.connection.connect(shadowConn);
        }
    }
};

// This function is PAIN
const updateBinaryOperator = (block: Blockly.BlockSvg, operator: '+' | '-' | '*' | '/'): void => {
    if (block.isInFlyout || (block.workspace as Blockly.WorkspaceSvg).isDragging()) return;

    const inputA = block.getInput("A");
    const inputB = block.getInput("B");
    if (!inputA || !inputB) return;

    const connA = inputA.connection?.targetConnection;
    const connB = inputB.connection?.targetConnection;

    const typeA = (connA?.getSourceBlock().isShadow() ? null : connA?.getCheck()?.[0]) as GLSLType | null;
    const typeB = (connB?.getSourceBlock().isShadow() ? null : connB?.getCheck()?.[0]) as GLSLType | null;

    if (operator === '/') {
        if (typeA && typeA !== "Number") {
            inputB.setCheck(["Number", typeA]);
            block.setOutput(true, typeA);
            updateShadow(block, "B", typeB || "Number");
        } else if (typeA === "Number") {
            inputB.setCheck("Number");
            block.setOutput(true, "Number");
            updateShadow(block, "B", "Number");
        } else if (typeB && typeB !== "Number") {
            inputA.setCheck(typeB);
            block.setOutput(true, typeB);
            updateShadow(block, "A", typeB);
        } else {
            inputA.setCheck(anyCheck);
            inputB.setCheck(anyCheck);
            block.setOutput(true, anyCheck);
            updateShadow(block, "A", "Number");
            updateShadow(block, "B", "Number");
        }
    } else if (operator === '*') {
        if (typeA && typeA !== "Number") {
            inputB.setCheck(["Number", typeA]);
            block.setOutput(true, typeA);
        } else if (typeB && typeB !== "Number") {
            inputA.setCheck(["Number", typeB]);
            block.setOutput(true, typeB);
        } else {
            inputA.setCheck(anyCheck);
            inputB.setCheck(anyCheck);
            block.setOutput(true, anyCheck);
        }
    } else {
        const matchType = typeA || typeB || "Number";
        inputA.setCheck(matchType);
        inputB.setCheck(matchType);
        block.setOutput(true, matchType);
    }
};

Blockly.Blocks["operators_add"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(anyCheck);
        this.appendValueInput("B").setCheck(anyCheck).appendField("+");
        this.setOutput(true, anyCheck);
        this.setStyle("operators_blocks");
    },
    onchange: function (this: Blockly.BlockSvg) {
        updateBinaryOperator(this, '+');
    }
};

Blockly.Blocks["operators_subtract"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(anyCheck);
        this.appendValueInput("B").setCheck(anyCheck).appendField("-");
        this.setOutput(true, anyCheck);
        this.setStyle("operators_blocks");
    },
    onchange: function (this: Blockly.BlockSvg) {
        updateBinaryOperator(this, '-');
    }
};

Blockly.Blocks["operators_multiply"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(anyCheck);
        this.appendValueInput("B").setCheck(anyCheck).appendField("*");
        this.setOutput(true, anyCheck);
        this.setStyle("operators_blocks");
    },
    onchange: function (this: Blockly.BlockSvg) {
        updateBinaryOperator(this, '*');
    }
};

Blockly.Blocks["operators_divide"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(anyCheck);
        this.appendValueInput("B").setCheck(anyCheck).appendField("/");
        this.setOutput(true, anyCheck);
        this.setStyle("operators_blocks");
    },
    onchange: function (this: Blockly.BlockSvg) {
        updateBinaryOperator(this, '/');
    }
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