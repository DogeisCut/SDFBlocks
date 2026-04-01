import * as Blockly from 'blockly';

export const gLSLGenerator = new Blockly.CodeGenerator('GLSL');

export enum Order {
    ATOMIC = 0,
    NONE = 99
}

let vars_made: number = 0

export function getUniqueVariableName() {
    return "i" + vars_made++
}