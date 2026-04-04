import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";
import { dom } from "blockly/core/utils";

enum BlocklyType {
    None = null,
    Number = "Number",
    Vector2 = "Vector2",
    Vector3 = "Vector3",
    Vector4 = "Vector4",
    Color = "Color",
    Boolean = "Boolean",
    Surface = "Surface",
    SDF = "SDF"
}

const typeMap = {
    [BlocklyType.None]: "",
    [BlocklyType.Number]: "float",
    [BlocklyType.Vector2]: "vec2",
    [BlocklyType.Vector3]: "vec3",
    [BlocklyType.Vector4]: "vec4",
    [BlocklyType.Color]: "vec3",
    [BlocklyType.Boolean]: "bool",
    [BlocklyType.Surface]: "Surface",
    [BlocklyType.SDF]: "SDF"
}

// I want you to have to select what type a variable returns

Blockly.Blocks["variables_mutator"] = {
    init: function (this: Blockly.Block & { kind_: BlocklyType }) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("type").appendField(new Blockly.FieldDropdown(Object.entries(typeMap).map(([key, value]) => [key, value])), "TYPE");
        this.setStyle("variables_blocks");
        this.setDeletable(false);
        this.setEditable(false);
    },
};

// and its default value at the start of the shader
// also gotta make sure there's only one of these per var
// also it may be best to just use fields for every type because initialized values have to be a constant value
Blockly.Blocks["variables_init"] = {
    init: function (this: Blockly.BlockSvg & { kind_: BlocklyType }) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("initialize variable").appendField(new Blockly.FieldVariable(null), "VARIABLE")
        this.appendValueInput("VALUE_ROW").appendField("to")
        this.setStyle("variables_blocks");
        this.setDeletable(false);
        this.setEditable(false);
        this.kind_ = BlocklyType.None;
        this.setMutator(new Blockly.icons.MutatorIcon(['variables_mutator'], this));
    },

    domToMutation: function (this: Blockly.BlockSvg & { kind_: BlocklyType }, xmlElement: Element) {
        const type = xmlElement.getAttribute("type");
        if (type) {
            this.kind_ = typeMap[type];
        }
    },

    mutationToDom: function (this: Blockly.BlockSvg & { kind_: BlocklyType }) {
        const container = document.createElement("mutation");
        container.setAttribute("type", Object.keys(typeMap).find(key => typeMap[key] === this.kind_) || "");
        return container;
    },

    compose: function (this: Blockly.BlockSvg & { kind_: BlocklyType }, topBlock: Blockly.Block) {

    },

    decompose: function (this: Blockly.BlockSvg & { kind_: BlocklyType }) {

    },

    updateShape_: function (this: Blockly.BlockSvg & { kind_: BlocklyType }) {
        this.removeInput
    }


};

Blockly.Blocks["variables_set"] = {
    init: function (this: Blockly.BlockSvg & { kind_: BlocklyType }) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("set variable").appendField(new Blockly.FieldVariable(null), "VARIABLE")
        this.appendValueInput("VALUE").setCheck([]).appendField("to")
        this.setStyle("variables_blocks");
        this.kind_ = BlocklyType.Number;
    },
};

Blockly.Blocks["variables_change"] = {
    init: function (this: Blockly.BlockSvg & { kind_: BlocklyType }) {
        this.setInputsInline(false);
        this.appendDummyInput().appendField("change variable").appendField(new Blockly.FieldVariable(null), "VARIABLE")
        this.appendValueInput("VALUE").setCheck([]).appendField("by")
        this.setStyle("variables_blocks");
        this.kind_ = BlocklyType.Number;
    },
};

Blockly.Blocks["variables_get"] = {
    init: function (this: Blockly.BlockSvg & { kind_: BlocklyType }) {
        this.setInputsInline(false);
        this.setOutput(true, [])
        this.appendDummyInput().appendField(new Blockly.FieldVariable(null), "VARIABLE")
        this.setStyle("variables_blocks");
        this.kind_ = BlocklyType.Number;
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["variables_init"] = function (block: Blockly.BlockSvg & { kind_: BlocklyType }, generator) {
    const VARIABLE = block.getFieldValue("VARIABLE");
    const VALUE = generator.valueToCode(block, "VALUE", BlocklyGLSL.Order.ATOMIC);
    const type = typeMap[block.kind_];
    return `${type} ${VARIABLE} = ${VALUE};\n`;
};