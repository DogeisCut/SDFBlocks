import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["combiners_union"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("union")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.setOutput(true, "SDF")
        this.setStyle("combiners_blocks");
    },
};


Blockly.Blocks["combiners_smooth_union"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("smooth union")
        this.appendValueInput("A").setCheck("SDF").appendField("a:")
        this.appendValueInput("B").setCheck("SDF").appendField("b:")
        this.appendValueInput("SMOOTHNESS").setCheck("Number").appendField("smoothness:")
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
    const SMOOTHNESS = generator.valueToCode(block, "SMOOTHNESS", BlocklyGLSL.Order.ATOMIC)
    return [`opSmoothUnion(${A}, ${B}, ${SMOOTHNESS});`, BlocklyGLSL.Order.NONE];
};
