import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";
import { specialSources } from "../compilier"

// might want to add a mutator to show and hide some of these options lol
Blockly.Blocks["scene"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        // TODO: Custom connection checker to prevent transform blocks being placed in any of these.
        // currently i just have `vec3 position;` at the start of the shader to prevent problems
        this.appendValueInput("CLEAR_COLOR").setCheck("Vector3").appendField("clear color:")
        this.appendValueInput("CAMERA_POSITION").setCheck("Vector3").appendField("camera position:")
        this.appendValueInput("CAMERA_ANGLE").setCheck("Vector3").appendField("camera angle:")
        this.appendValueInput("FOV").setCheck("Number").appendField("field of view:")
        this.appendValueInput("CONTROLS").setCheck("Boolean").appendField("camera controls:")
        this.appendStatementInput("SCENE").setCheck("default").appendField("scene")
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



// kind of considering just making another branch for setup blocks with special connection checkers
// or i can just put scene as a var at the start to prevent errors there too lmao
// idk how satisfied i am with this approach to start values, especially since some people
// will want to use variables with them and the idea i have for variable initilization may be awkward.
BlocklyGLSL.gLSLGenerator.forBlock["scene"] = function (block, generator) {
    const CLEAR_COLOR = generator.valueToCode(block, "CLEAR_COLOR", BlocklyGLSL.Order.ATOMIC)
    const CAMERA_POSITION = generator.valueToCode(block, "CAMERA_POSITION", BlocklyGLSL.Order.ATOMIC)
    const CAMERA_ANGLE = generator.valueToCode(block, "CAMERA_ANGLE", BlocklyGLSL.Order.ATOMIC)
    const FOV = generator.valueToCode(block, "FOV", BlocklyGLSL.Order.ATOMIC)
    const CONTROLS = generator.valueToCode(block, "CONTROLS", BlocklyGLSL.Order.ATOMIC)
    const SCENE = generator.statementToCode(block, "SCENE")
    specialSources.mainStart.push(`backgroundColor = ${CLEAR_COLOR};`)
    specialSources.mainStart.push(`cameraPosition = ${CAMERA_POSITION};`)

    specialSources.mainStart.push(`field_of_view = ${FOV};`)
	return `SDF sdScene(vec3 position) {\n    SDF scene = makeSDF(MAX_DIST_TO_TRAVEL, makeSurface(vec3(0.0), 1.0, 0.0, 0.0));\n    \n${SCENE}\n    \n    return scene;\n}`;
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