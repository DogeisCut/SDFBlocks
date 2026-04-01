import * as Blockly from 'blockly';

export const gLSLGenerator = new Blockly.CodeGenerator('GLSL');

export enum Order {
    ATOMIC = 0,
    NONE = 99
}