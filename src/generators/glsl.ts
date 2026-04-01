import * as Blockly from 'blockly';

export const gLSLGenerator = new Blockly.CodeGenerator('GLSL');

export enum Order {
    ATOMIC = 0,
    NONE = 99
}

gLSLGenerator.INDENT = "    "

gLSLGenerator.init = function(workspace: Blockly.Workspace) {
    this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);

    this.definitions_ = Object.create(null);

    if (!this.nameDB_) {
        this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
    } else {
        this.nameDB_.reset();
    }

    this.nameDB_.setVariableMap(workspace.getVariableMap());
};

gLSLGenerator.scrub_ = function(block: Blockly.Block, code: string, thisOnly?: boolean) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + '\n' + gLSLGenerator.blockToCode(nextBlock);
    }
    return code;
};