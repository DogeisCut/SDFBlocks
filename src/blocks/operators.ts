import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

const typeToShadowMap: Record<string, string | null> = {
    "Number": "values_float",
    "Vector2": "values_vector2",
    "Vector3": "values_vector3",
    "Vector4": "values_vector4",
    "Color": "values_color",
    "SDF": "values_sdf",
    "Surface": "values_surface",
    "Boolean": null,
};

// TODO: fix bug where changing the type while a block in it uhhh makes errors :(
// TODO: unary operator function for rounding, trig, and other stuff
export function defineBinaryOperator( opName: string, symbol: string, typeMap: Record<string, Record<string, string>>, forceReturnType?: string) {
    const mainBlockName = `operators_${opName}`;
    const mutatorBlockName = `${mainBlockName}_mutator_config`;

    const allATypes = Object.keys(typeMap);

    Blockly.Blocks[mutatorBlockName] = {
        init: function (this: Blockly.Block) {
            this.setInputsInline(true);
            
            const aOptions = allATypes.map(type => [type, type] as [string, string]);
            
            const aValidator = function(this: Blockly.FieldDropdown, newValue: string) {
                const block = this.getSourceBlock();
                if (!block) return newValue;

                const currentB = block.getFieldValue("B");
                const allowedBTypes = Object.keys(typeMap[newValue]);

                if (!allowedBTypes.includes(currentB)) {
                    block.setFieldValue(allowedBTypes[0], "B");
                }
                return newValue;
            };

            this.appendDummyInput()
                .appendField("input a:")
                .appendField(new Blockly.FieldDropdown(aOptions, aValidator), "A");

            const bDropdownGen = function(this: Blockly.FieldDropdown) {
                const block = this.getSourceBlock();
                const currentA = block ? block.getFieldValue("A") : allATypes[0];
                const allowedBTypes = typeMap[currentA] ? Object.keys(typeMap[currentA]) : [];
                return allowedBTypes.map(type => [type, type] as [string, string]);
            };

            this.appendDummyInput()
                .appendField("input b:")
                .appendField(new Blockly.FieldDropdown(bDropdownGen), "B");

            this.setStyle("operators_blocks");
            this.setTooltip(`Configure the types for the ${symbol} operation.`);
        }
    };

    Blockly.Blocks[mainBlockName] = {
        init: function (this: any) {
            this.aType_ = allATypes[0];
            this.bType_ = Object.keys(typeMap[this.aType_])[0];

            this.setInputsInline(true);
            this.appendValueInput("A").setCheck(this.aType_);
            this.appendValueInput("B").setCheck(this.bType_).appendField(symbol);
            
            this.setOutput(true, forceReturnType ?? typeMap[this.aType_][this.bType_]);
            this.setStyle("operators_blocks");
            
            this.setMutator(new Blockly.icons.MutatorIcon([], this));

            this.updateShape_();
        },

        mutationToDom: function (this: any) {
            const container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('atype', this.aType_);
            container.setAttribute('btype', this.bType_);
            return container;
        },

        domToMutation: function (this: any, xmlElement: Element) {
            this.aType_ = xmlElement.getAttribute('atype') || allATypes[0];
            this.bType_ = xmlElement.getAttribute('btype') || Object.keys(typeMap[this.aType_])[0];
            this.updateShape_();
        },

        decompose: function (this: any, workspace: Blockly.WorkspaceSvg) {
            const containerBlock = workspace.newBlock(mutatorBlockName);
            containerBlock.initSvg();
            containerBlock.setFieldValue(this.aType_, 'A');
            containerBlock.setFieldValue(this.bType_, 'B');
            return containerBlock;
        },

        compose: function (this: any, containerBlock: Blockly.BlockSvg) {
            this.aType_ = containerBlock.getFieldValue('A');
            this.bType_ = containerBlock.getFieldValue('B');
            this.updateShape_();
        },

        updateShape_: function (this: any) {
            const inputA = this.getInput("A");
            const inputB = this.getInput("B");
            
            const resultType = typeMap[this.aType_]?.[this.bType_];

            if (!resultType) {
                inputA?.connection?.setShadowState(null);
                inputB?.connection?.setShadowState(null);
                inputA?.setCheck([]);
                inputB?.setCheck([]);
                this.setOutput(true, forceReturnType ?? []);
                return;
            }

            const safelyApplyType = (input: Blockly.Input | null, newType: string) => {
                if (!input || !input.connection) return;

                // i like that blockly removes shadows in a stupid buggy fasion if the outputs dont match instead of deleting it
                
                const targetShadowType = typeToShadowMap[newType];
                const currentTarget = input.connection.targetBlock();
                
                const isWrongShadow = currentTarget?.isShadow() && currentTarget.type !== targetShadowType;

                if (isWrongShadow) {
                    input.connection.setShadowState(null);
                }

                input.setCheck(newType);

                if (targetShadowType && !input.connection.targetBlock()) {
                    input.connection.setShadowState({ type: targetShadowType });
                }
            };

            safelyApplyType(inputA, this.aType_);
            safelyApplyType(inputB, this.bType_);
            
            this.setOutput(true, forceReturnType ?? resultType);
        }
    };
}

defineBinaryOperator("add", "+", {
    "Number": { "Number": "Number", "Vector2": "Vector2", "Vector3": "Vector3", "Vector4": "Vector4", "Color": "Color" },
    "Vector2": { "Vector2": "Vector2", "Number": "Vector2" },
    "Vector3": { "Vector3": "Vector3", "Number": "Vector3", "Color": "Vector3" },
    "Vector4": { "Vector4": "Vector4", "Number": "Vector4" },
    "Color":   { "Color": "Color", "Number": "Color", "Vector3": "Color" },
});

defineBinaryOperator("subtract", "+", {
    "Number":  { "Number": "Number", "Vector2": "Vector2", "Vector3": "Vector3", "Vector4": "Vector4", "Color": "Color" },
    "Vector2": { "Vector2": "Vector2", "Number": "Vector2" },
    "Vector3": { "Vector3": "Vector3", "Number": "Vector3", "Color": "Vector3" },
    "Vector4": { "Vector4": "Vector4", "Number": "Vector4" },
    "Color":   { "Color": "Color", "Number": "Color", "Vector3": "Color" },
});

defineBinaryOperator("multiply", "*", {
    "Number":  { "Number": "Number", "Vector2": "Vector2", "Vector3": "Vector3", "Vector4": "Vector4", "Color": "Color" },
    "Vector2": { "Vector2": "Vector2", "Number": "Vector2" },
    "Vector3": { "Vector3": "Vector3", "Number": "Vector3", "Color": "Vector3" },
    "Vector4": { "Vector4": "Vector4", "Number": "Vector4" },
    "Color":   { "Color": "Color", "Number": "Color", "Vector3": "Color" },
});

defineBinaryOperator("divide", "/", {
    "Number":  { "Number": "Number" }, 
    "Vector2": { "Vector2": "Vector2", "Number": "Vector2" },
    "Vector3": { "Vector3": "Vector3", "Number": "Vector3", "Color": "Vector3" },
    "Vector4": { "Vector4": "Vector4", "Number": "Vector4" },
    "Color":   { "Color": "Color", "Number": "Color", "Vector3": "Color" },
});

defineBinaryOperator("power", "^", {
    "Number":  { "Number": "Number" }, 
    "Vector2": { "Vector2": "Vector2", "Number": "Vector2" },
    "Vector3": { "Vector3": "Vector3", "Number": "Vector3", "Color": "Vector3" },
    "Vector4": { "Vector4": "Vector4", "Number": "Vector4" },
    "Color":   { "Color": "Color", "Number": "Color", "Vector3": "Color" },
});

defineBinaryOperator("modulus", "mod", {
    "Number":  { "Number": "Number" }, 
    "Vector2": { "Vector2": "Vector2", "Number": "Vector2" },
    "Vector3": { "Vector3": "Vector3", "Number": "Vector3", "Color": "Vector3" },
    "Vector4": { "Vector4": "Vector4", "Number": "Vector4" },
    "Color":   { "Color": "Color", "Number": "Color", "Vector3": "Color" },
});

Blockly.Blocks["operators_rounding"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField(
            new Blockly.FieldDropdown(
                [
                    ["round","round"],
                    ["ceilling", "ceil"],
                    ["floor", "floor"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};


Blockly.Blocks["operators_trig"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField(
            new Blockly.FieldDropdown(
                [
                    ["sine of","sin"],
                    ["cosine of", "cos"],
                    ["tangent of", "tan"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_unary"] = { // square root of, fractional of, negate, absolute value of, sign of, exp, log, exp2, log2
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField(
            new Blockly.FieldDropdown(
                [
                    ["square root of", "sqrt"],
                    ["fractional part of", "fract"],
                    ["negate", "-"],
                    ["absolute value of", "abs"],
                    ["sign of", "sign"],
                    ["logarithm of", "log"],
                    ["exp", "exp"],
                    ["exp2", "exp2"],
                    ["log2", "log2"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_mix"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number").appendField("mix");
        this.appendValueInput("B").setCheck("Number").appendField("and");
        this.appendValueInput("BY").setCheck("Number").appendField("by");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_bounds"] = { // min and max
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number").appendField(
            new Blockly.FieldDropdown(
                [
                    ["max of", "max"],
                    ["min of", "min"],
                ]
            ),
            "OPERATION");
        this.appendValueInput("B").setCheck("Number").appendField("and");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_clamp"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck("Number").appendField("clamp");
        this.appendValueInput("MIN").setCheck("Number").appendField("between");
        this.appendValueInput("MAX").setCheck("Number").appendField("and");
        this.setOutput(true, "Number");
        this.setStyle("operators_blocks");
    },
};

// the outputs dont matter here, prob should just make a seperate func tbh
// also weird issue where the dropdowns are getting set wrong???
defineBinaryOperator("equals", "=", {
    "Number": { "Number": "Number" },
    "Vector2": { "Vector2": "Vector2", "Color": "Color" },
    "Vector3": { "Vector3": "Vector3" },
    "Vector4": { "Vector4": "Vector4" },
    "Color": { "Color": "Color", "Vector2": "Vector2" },
    "SDF": { "SDF": "SDF" },
    "Surface": { "Surface": "Surface" },
    "Boolean": { "Boolean": "Boolean" },
}, "Boolean");

defineBinaryOperator("not_equals", "≠", {
    "Number": { "Number": "Number" },
    "Vector2": { "Vector2": "Vector2", "Color": "Color" },
    "Vector3": { "Vector3": "Vector3" },
    "Vector4": { "Vector4": "Vector4" },
    "Color": { "Color": "Color", "Vector2": "Vector2" },
    "SDF": { "SDF": "SDF" },
    "Surface": { "Surface": "Surface" },
    "Boolean": { "Boolean": "Boolean" },
}, "Boolean");

Blockly.Blocks["operators_less_than"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("<");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_less_than_or_equal"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("≤");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_greater_than"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField(">");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_greater_than_or_equal"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("≥");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_and"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField("and");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_or"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField("or");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_not"] = {
    init: function () {
        this.setInputsInline(true);
        this.appendValueInput("Boolean").setCheck("Boolean").appendField("not");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_true"] = { // these might not be neccisary with the checkbox value. though i hate the checkbox field in blockly so i might just shadow false instead
    init: function () {
        this.appendDummyInput().appendField("true")
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_false"] = {
    init: function () {
        this.appendDummyInput().appendField("false")
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};



BlocklyGLSL.gLSLGenerator.forBlock["operators_add"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} + ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_subtract"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} - ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_multiply"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} * ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_divide"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`${A} / ${B}`, BlocklyGLSL.Order.NONE];
};

BlocklyGLSL.gLSLGenerator.forBlock["operators_power"] = function (block, generator) {
    const A = generator.valueToCode(block, "A", BlocklyGLSL.Order.ATOMIC)
    const B = generator.valueToCode(block, "B", BlocklyGLSL.Order.ATOMIC)
    return [`pow(${A}, ${B})`, BlocklyGLSL.Order.NONE];
};