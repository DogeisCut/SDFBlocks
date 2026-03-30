import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";
import { EventType } from "blockly/core/events/type";

Blockly.Blocks["labeling_label"] = {
    init: function () {
        this.appendDummyInput("LABEL_TEXT").appendField("label:").appendField(new Blockly.FieldTextInput(""), "LABEL")
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.setOutput(true);
        this.setStyle("labeling_blocks");
        this.mode_ = 'inert'
        this.updateShape_();
    },

    updateShape_: function (ids: any, connections: any) {
        switch (this.mode_) {
            case 'inert':
                this.setOutput(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.removeInput("VALUE", true);
                this.removeInput("DO", true);
                break;
            case 'stack':
                const previousCheck = this.previousConnection?.targetConnection?.check
                this.setOutput(false);
                this.setPreviousStatement(true, previousCheck);
                this.setNextStatement(true, previousCheck);
                this.removeInput("VALUE", true);
                if (!this.getInput("DO")) {
                    this.appendStatementInput("DO").setCheck(previousCheck)
                }
                break;
            case 'input':
                const outputCheck = this.outputConnection?.targetConnection?.check
                this.setOutput(true, outputCheck);
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                let valueInput = this.getInput("VALUE")
                if (!valueInput) {
                    valueInput = this.appendValueInput("VALUE");
                    this.moveInputBefore("VALUE", "LABEL_TEXT");
                    
                }
                valueInput.setCheck(outputCheck);
                this.removeInput("DO", true);
                break;
        }
    },

    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('mode', this.mode_);
        return container;
    },

    domToMutation: function (xmlElement: { getAttribute: (arg0: string) => any; }) {
        this.mode_ = String(xmlElement.getAttribute('mode'));
        this.updateShape_();
    },

    onchange: function (event: { type: EventType; isStart: any; }) {
        if (event.type !== Blockly.Events.BLOCK_DRAG || event.isStart) return;

        const inInput = !!(this.outputConnection?.isConnected()) || !!(this.getInput("VALUE")?.connection?.isConnected());
        const inStack = !!(this.previousConnection?.isConnected() || this.nextConnection?.isConnected()) || !!(this.getInput("DO")?.connection?.isConnected());
        const inAnything = inInput || inStack

        if (inAnything) {
            this.mode_ = "inert"
            if (inInput) {
                this.mode_ = "input"
            } else if (inStack) {
                this.mode_ = "stack"
            }
        } else {
            this.mode_ = "inert"
        }
        this.updateShape_()

        // TODO: fix undo
        // TODO: make block hover preview show result
        // TODO: make input keep block shape if theres a block in it
        // TODO: make input inherit shadow of the block it's put on
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["labeling_label"] = function (block, generator) {
    const label = block.getFieldValue("LABEL");

    // TODO: fix the "(block as any)" with proper type stuff
    if ((block as any).mode_ === 'input') { 
        const value = generator.valueToCode(block, "VALUE", BlocklyGLSL.Order.ATOMIC) || 'null';
        return [`${value}`, BlocklyGLSL.Order.ATOMIC];
    } else if ((block as any).mode_ === 'stack') {
        const code = []
        let target = block.getInput("DO")?.connection?.targetBlock()
        if (!target) {
            return ``
        }
        while (target) {
            code.push(generator.blockToCode(target, false))
            target = target.getNextBlock()
        }
        return code.join("\n");
    }
    return '';
};