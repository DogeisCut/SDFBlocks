import * as Blockly from "blockly";
import * as BlocklyWebGL from "../generators/webgl";

Blockly.Blocks["surfaces_generic_surface"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("generic surface")
        this.setOutput(true, "Surface")
        this.setStyle("surfaces_blocks");
    },
};

Blockly.Blocks["surfaces_create_surface"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create surface")
        this.appendValueInput("COLOR").setCheck("Color").appendField("color:")
        this.appendValueInput("ROUGHNESS").setCheck("Number").appendField("roughness:")
        this.appendValueInput("METALLICITY").setCheck("Number").appendField("metallicity:")
        this.appendValueInput("EMISSION").setCheck("Number").appendField("emission:")
        this.setOutput(true, "Surface")
        this.setStyle("surfaces_blocks");
    },
};



BlocklyWebGL.webGLGenerator.forBlock["surfaces_generic_surface"] = function (block, generator) {
    return [`makeSurface(vec3(1.0), 1.0, 0.0, 0.0)`, BlocklyWebGL.Order.NONE];
};

BlocklyWebGL.webGLGenerator.forBlock["surfaces_create_surface"] = function (block, generator) {
    const COLOR = generator.valueToCode(block, "COLOR", BlocklyWebGL.Order.ATOMIC)
    const ROUGHNESS = generator.valueToCode(block, "ROUGHNESS", BlocklyWebGL.Order.ATOMIC)
    const METALLICITY = generator.valueToCode(block, "METALLICITY", BlocklyWebGL.Order.ATOMIC)
    const EMISSION = generator.valueToCode(block, "EMISSION", BlocklyWebGL.Order.ATOMIC)
    return [`makeSurface(${COLOR}, ${ROUGHNESS}, ${METALLICITY}, ${EMISSION})`, BlocklyWebGL.Order.NONE];
};
