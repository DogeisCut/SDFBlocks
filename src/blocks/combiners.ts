import * as Blockly from "blockly";
import * as BlocklyWebGL from "../generators/webgl";

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



BlocklyWebGL.webGLGenerator.forBlock["combiners_union"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyWebGL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyWebGL.Order.ATOMIC)
    return [`opUnion(${A}, ${B})`, BlocklyWebGL.Order.NONE];
};

BlocklyWebGL.webGLGenerator.forBlock["combiners_smooth_union"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyWebGL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyWebGL.Order.ATOMIC)
    const SMOOTHNESS = generator.valueToCode(block, "SMOOTHNESS", BlocklyWebGL.Order.ATOMIC)
    return [`opSmoothUnion(${A}, ${B}, ${SMOOTHNESS});`, BlocklyWebGL.Order.NONE];
};
