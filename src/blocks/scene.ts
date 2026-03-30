import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["scene"] = {
  init: function () {
        this.setInputsInline(true);
        this.appendStatementInput("INIT").setCheck("default").appendField("init:")
        this.appendValueInput("SDF").setCheck("SDF").appendField("scene:");
        this.setStyle("scene_blocks");
        this.setDeletable(false);
        //this.setMovable(false);
        this.setEditable(false);
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



BlocklyJS.javascriptGenerator.forBlock["scene"] = function (block, generator) {
	return `\n`;
};
