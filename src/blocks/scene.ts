import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["scene"] = {
  init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("scene")
        this.appendStatementInput("SCENE").setCheck("default")
        this.setStyle("scene_blocks");
        this.setDeletable(false);
        this.setEditable(false);
    },
};

Blockly.Blocks["scene_current_scene"] = {
  init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("current scene")
        this.setOutput(true, "SDF")
        this.setStyle("scene_blocks");
    },
};

Blockly.Blocks["scene_set_scene"] = {
  init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setNextStatement(true, "default");
        this.setPreviousStatement(true, "default");
        this.appendValueInput("SDF").setCheck("SDF").appendField("set scene to")
        this.setStyle("scene_blocks");
    },
};

Blockly.Blocks["scene_append_to_scene"] = {
  init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setNextStatement(true, "default");
        this.setPreviousStatement(true, "default");
        this.appendValueInput("SDF").setCheck("SDF").appendField("append")
        this.appendDummyInput().appendField("to scene")
        this.setStyle("scene_blocks");
    },
};

// lowkey im just gonna make these stuff just part of the scene block so you arent putting them in the middle of sdf code :sob:

Blockly.Blocks["scene_set_clear_color"] = {
  init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("COLOR").setCheck("Vector3").appendField("set clear color to:");
        this.setStyle("scene_blocks");
    },
};

Blockly.Blocks["scene_customize_shadows"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["scene_customize_shading"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["scene_set_fog"] = {
  init: function (this: Blockly.Block) {
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
    const SCENE = generator.statementToCode(block, "SCENE")
	return `${SCENE}`;
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