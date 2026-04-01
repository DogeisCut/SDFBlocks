import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["combiners_union"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("union")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};

Blockly.Blocks["combiners_smooth_union"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("smooth union")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.appendValueInput("AMOUNT").setCheck("Number").appendField("amount:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};

Blockly.Blocks["combiners_subtract"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("subtract")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};

Blockly.Blocks["combiners_smooth_subtract"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("smooth suubtract")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.appendValueInput("AMOUNT").setCheck("Number").appendField("amount:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};

Blockly.Blocks["combiners_intersect"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("intersect")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};

Blockly.Blocks["combiners_smooth_intersect"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("smooth intersect")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.appendValueInput("AMOUNT").setCheck("Number").appendField("amount:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};

Blockly.Blocks["combiners_paint"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("paint")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};

Blockly.Blocks["combiners_smooth_paint"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("smooth paint")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.appendValueInput("AMOUNT").setCheck("Number").appendField("amount:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["combiners_union"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`opUnion(${A}, ${B})`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["combiners_smooth_union"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    const AMOUNT = generator.valueToCode(block, "AMOUNT", BlocklyGLSL.Order.ATOMIC)
    return [`opSmoothUnion(${A}, ${B}, ${AMOUNT});`, BlocklyGLSL.Order.NONE];
};
