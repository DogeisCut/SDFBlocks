import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["surfaces_generic_surface"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("generic surface")
        this.setOutput(true, "Surface")
        this.setStyle("surfaces_blocks");
    },
};

Blockly.Blocks["surfaces_create_surface_mutator_surface"] = { // Optional params
    init: function () {
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



BlocklyGLSL.gLSLGenerator.forBlock["surfaces_generic_surface"] = function (block, generator) {
    return [`makeSurface(vec3(1.0), 1.0, 0.0, 0.0)`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["surfaces_create_surface"] = function (block, generator) {
    const COLOR = generator.valueToCode(block, "COLOR", BlocklyGLSL.Order.ATOMIC)
    const ROUGHNESS = generator.valueToCode(block, "ROUGHNESS", BlocklyGLSL.Order.ATOMIC)
    const METALLICITY = generator.valueToCode(block, "METALLICITY", BlocklyGLSL.Order.ATOMIC)
    const EMISSION = generator.valueToCode(block, "EMISSION", BlocklyGLSL.Order.ATOMIC)
    return [`makeSurface(${COLOR}, ${ROUGHNESS}, ${METALLICITY}, ${EMISSION})`, BlocklyGLSL.Order.NONE];
};
