import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["scene"] = {
  init: function () {
        this.setInputsInline(true);
        this.appendStatementInput("SCENE").setCheck("default").appendField("scene:")
        this.setStyle("scene_blocks");
        this.setDeletable(false);
        this.setEditable(false);
    },
};

Blockly.Blocks["scene_current_scene"] = {
  init: function () {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("current scene")
        this.setOutput(true, "SDF")
        this.setStyle("scene_blocks");
    },
};

Blockly.Blocks["scene_set_scene"] = {
  init: function () {
        this.setInputsInline(true);
        this.setNextStatement(true, "default");
        this.setPreviousStatement(true, "default");
        this.appendValueInput("SDF").setCheck("SDF").appendField("set scene to")
        this.setStyle("scene_blocks");
    },
};

Blockly.Blocks["scene_append_to_scene"] = {
  init: function () {
        this.setInputsInline(true);
        this.setNextStatement(true, "default");
        this.setPreviousStatement(true, "default");
        this.appendValueInput("SDF").setCheck("SDF").appendField("append")
        this.appendDummyInput().appendField("to scene")
        this.setStyle("scene_blocks");
    },
};

Blockly.Blocks["scene_set_clear_color"] = {
  init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("COLOR").setCheck("Color").appendField("set clear color to:");
        this.setStyle("scene_blocks");
    },
};

Blockly.Blocks["scene_customize_shadows"] = {
    init: function () {
    },
};

Blockly.Blocks["scene_customize_shading"] = {
    init: function () {
    },
};

Blockly.Blocks["scene_set_fog"] = {
  init: function () {
        this.setInputsInline(false);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendDummyInput().appendField("set fog")
        this.appendValueInput("MIN").setCheck("Number").appendField("minimum:");
        this.appendValueInput("MAX").setCheck("Number").appendField("maximum:");
        this.setStyle("scene_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["scene"] = function (block, generator) {
    const code = []
    let target = block.getInput("SCENE")?.connection?.targetBlock()
    if (!target) {
        return ``
    }
    while (target) {
        code.push(generator.blockToCode(target, false))
        target = target.getNextBlock()
    }
	return code.join("\n");
};

BlocklyGLSL.gLSLGenerator.forBlock["scene_current_scene"] = function (block, generator) {
	return [`scene`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["scene_set_scene"] = function (block, generator) {
    const SDF = generator.valueToCode(block, "SDF", BlocklyGLSL.Order.ATOMIC)
	return `scene = ${SDF};`;
};

BlocklyGLSL.gLSLGenerator.forBlock["scene_append_to_scene"] = function (block, generator) {
    const SDF = generator.valueToCode(block, "SDF", BlocklyGLSL.Order.ATOMIC)
	return `scene = opUnion(scene, ${SDF});`;
};