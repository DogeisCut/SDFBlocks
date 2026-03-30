import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript";

Blockly.Blocks["sdfs_nothing"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField("nothing")
        this.setOutput(true, "SDF")
        this.setStyle("sdfs_blocks");
    },
};

Blockly.Blocks["sdfs_sphere"] = {
    init: function () {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("create sphere")
        this.appendValueInput("SURFACE").setCheck("Surface").appendField("surface:")
        this.appendStatementInput("TRANSFORM").setCheck("Transform").appendField("transform:")
        this.appendValueInput("RADIUS").setCheck("Number").appendField("radius:")
        this.setOutput(true, "SDF")
        this.setStyle("sdfs_blocks");
    },
};



BlocklyJS.javascriptGenerator.forBlock["sdfs_nothing"] = function (block, generator) {
    return `\n`;
};

BlocklyJS.javascriptGenerator.forBlock["sdfs_sphere"] = function (block, generator) {
    return `\n`;
};
