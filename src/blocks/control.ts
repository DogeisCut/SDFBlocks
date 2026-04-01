import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

Blockly.Blocks["control_if"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if")
        this.appendDummyInput().appendField("then")
        this.appendStatementInput("DO").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_if_else"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if")
        this.appendDummyInput().appendField("then")
        this.appendStatementInput("DO").setCheck("default")
        this.appendDummyInput().appendField("else")
        this.appendStatementInput("ELSE").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_repeat"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("TIMES").setCheck("Number").appendField("repeat")
        this.appendStatementInput("DO").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_while"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("while")
        this.appendStatementInput("DO").setCheck("default")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_do_while"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.appendDummyInput().appendField("do")
        this.appendStatementInput("DO").setCheck("default")
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("while")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_loop_index"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setOutput(true, "Number")
        this.appendDummyInput().appendField("loop index")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_continue"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.appendDummyInput().appendField("continue")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_break"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.appendDummyInput().appendField("break")
        this.setStyle("control_blocks");
    },
};

Blockly.Blocks["control_discard"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.setPreviousStatement(true, "default");
        this.appendDummyInput().appendField("discard")
        this.setStyle("control_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["control_if"] = function (block, generator) {
    const CONDITION = generator.valueToCode(block, "CONDITION", BlocklyGLSL.Order.ATOMIC) || false
    const DO = generator.statementToCode(block, "DO")
    return `if (${CONDITION}) {\n${DO}\n}`;
};

BlocklyGLSL.gLSLGenerator.forBlock["control_if_else"] = function (block, generator) {
    const CONDITION = generator.valueToCode(block, "CONDITION", BlocklyGLSL.Order.ATOMIC) || false
    const DO = generator.statementToCode(block, "DO")
    const ELSE = generator.statementToCode(block, "ELSE")
    return `if (${CONDITION}) {\n${DO}\n} else {\n${ELSE}\n}`;
};

BlocklyGLSL.gLSLGenerator.forBlock["control_repeat"] = function (block, generator) {
    const times = generator.valueToCode(block, "TIMES", BlocklyGLSL.Order.ATOMIC) || "0";
    const branch = generator.statementToCode(block, "DO");
    
    const loopVar = generator.getVariableName("i");
    
    (block as any).loopVar_ = loopVar;

    let code = `for (int ${loopVar} = 0; ${loopVar} < int(${times}); ${loopVar}++) {\n`;
    code += branch;
    code += `}\n`;
    
    return code;
};

BlocklyGLSL.gLSLGenerator.forBlock["control_while"] = function (block, generator) {
    const CONDITION = generator.valueToCode(block, "CONDITION", BlocklyGLSL.Order.ATOMIC) || false
    const DO = generator.statementToCode(block, "DO")
    return `while (${CONDITION}) {\n${DO}\n}`;
};

BlocklyGLSL.gLSLGenerator.forBlock["control_do_while"] = function (block, generator) {
    const CONDITION = generator.valueToCode(block, "CONDITION", BlocklyGLSL.Order.ATOMIC) || false
    const DO = generator.statementToCode(block, "DO")
    return `do {\n${DO}\n} while (${CONDITION})`;
};

BlocklyGLSL.gLSLGenerator.forBlock["control_loop_index"] = function (block, generator) {
    let parent = block.getParent();
    let loopVar = null;

    while (parent) {
        if (parent.type === "control_repeat" && (parent as any).loopVar) {
            loopVar = (parent as any).loopVar_;
            break;
        }
        parent = parent.getParent();
    }

    const code = loopVar ? loopVar : "0";
    return [code, BlocklyGLSL.Order.ATOMIC];
};

BlocklyGLSL.gLSLGenerator.forBlock["control_continue"] = function (block, generator) {
    return "continue;";
};

BlocklyGLSL.gLSLGenerator.forBlock["control_break"] = function (block, generator) {
    return "break;";
};

BlocklyGLSL.gLSLGenerator.forBlock["control_discard"] = function (block, generator) {
    return "discard;";
};