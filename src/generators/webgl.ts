import * as Blockly from 'blockly';

export const webGLGenerator = new Blockly.CodeGenerator('WebGL');

export enum Order {
    ATOMIC = 0,
    NONE = 99
}