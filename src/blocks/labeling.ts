import * as Blockly from "blockly";
import { EventType } from "blockly/core/events/type";
import * as BlocklyJS from "blockly/javascript";

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
                this.setOutput(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.removeInput("VALUE", true);
                if (!this.getInput("DO")) {
                    this.appendStatementInput("DO").setCheck("default")
                }
                break;
            case 'input':
                this.setOutput(true);
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                let valueInput = this.getInput("VALUE")
                if (!valueInput) {
                    valueInput = this.appendValueInput("VALUE");
                    this.moveInputBefore("VALUE", "LABEL_TEXT");
                }
                valueInput.setCheck(this.outputConnection?.targetConnection?.check);
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



BlocklyJS.javascriptGenerator.forBlock["labeling_label"] = function (block, generator) {
    return `\n`;
};