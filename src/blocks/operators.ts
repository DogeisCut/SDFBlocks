import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["operators_add"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("+");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_subtract"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("-");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_multiply"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("*");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_divide"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("/");
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
    },
};

Blockly.Blocks["operators_rounding"] = {
    init: function () {
    },
};


Blockly.Blocks["operators_trig"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_unary"] = { // square root of, fractional of, negate, absolute value of, sign of, exp, log, exp2, log2
    init: function () {
    },
};

Blockly.Blocks["operators_mix"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_bounds"] = { // min and max
    init: function () {
    },
};

Blockly.Blocks["operators_clamp"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_equals"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_not_equals"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_less_than"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_less_than_or_equal"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_greater_than"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_greater_than_or_equal"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_and"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_or"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_not"] = {
    init: function () {
    },
};

Blockly.Blocks["operators_true"] = { // these might not be neccisary with the checkbox value. though i hate the checkbox field in blockly so i might just shadow false instead
    init: function () {
    },
};

Blockly.Blocks["operators_false"] = {
    init: function () {
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