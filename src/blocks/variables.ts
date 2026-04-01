import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

// I want you to have to select what type a variable returns

// and its default value at the start of the shader
// also gotta make sure there's only one of these per var
// also it may be best to just use fields for every type because initialized values have to be a constant value
Blockly.Blocks["variables_init"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("initialize variable").appendField(new Blockly.FieldVariable(null), "VARIABLE")
        this.appendValueInput("VALUE").setCheck([]).appendField("to")
        this.setStyle("variables_blocks");
        this.setDeletable(false);
        this.setEditable(false);
    },
};

Blockly.Blocks["variables_set"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["variables_change"] = {
    init: function (this: Blockly.Block) {
    },
};

Blockly.Blocks["variables_get"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(false);
        this.setOutput(true, [])
        this.appendDummyInput().appendField(new Blockly.FieldVariable(null), "VARIABLE")
        this.setStyle("variables_blocks");
    },
};