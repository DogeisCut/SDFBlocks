import * as Blockly from "blockly";
import * as BlocklyGLSL from "../generators/glsl";

/*
I have a huge design problem that popped up in MarchBlocks, and I have no idea how to fix it.

So, the language (GLSL) that MarchBlocks compiles to is strictly typed. This is fine, Blockly has type systems just for this. 

The problem arises with my binary operation blocks (+, -, /, *, etc). Currently, I have them set up to only accept only numbers,
but GLSL, supports operations for vectors too, which my application has vector 2s, 3s, and 4s. I'm designing this so that the user 
doesn't have to worry about errors or warnings.

There's also the Color type, which compiles to a vec3, all vector3 blocks accept this type and vice versa.

Other types include Boolean, SDF, and Surface.

Number acts as floats and ints depending on the situation.

Shadows for each of the types are as follows:
Number -> values_float
Boolean -> values_boolean
Vector# -> values_vector#
SDF -> values_sdf
Surface -> values_surface

If i set up the binary operation blocks to accept anything or return anything, chances are someone will try to add a vec3 to a 
vec2 or put an operation that returns a vector in a number only field or try to divide a number by a vector. 
This will make the shader error, which I don't want. I don't even want warnings.

I don't want to make 4509 copies of the same block each with a different type for every possible combination. Does Blockly have 
a way to solve this elegantly? By elegantly, i mean not making the block any larger than it is (e.g. adding dropdowns, or hell, 
even a mutator icon). It's also worth noting that there's shadowed values for these block's inputs, much like scratch, except 
there some for vectors too. So if the solution involves "locking in" an input and the output based on the other inputs, that 
can get complicated, especially since division, multiplication, and subtraction+addition all have to be handled differently.

Plus, GLSL's operators and functions all accept a wide varaiety of types but its not always consistent for all of them,
it's a lot of research to find what combinations are valid and which arent. This issue actually expands beyond the
binary operation blocks because of that, even effecting logic operations, trig functions, max, min, etc! I mentioned
the SDF and Surface types because those are structs in the shader MarchBlocks compiles to, those need to be accounted
for aswell.

Here's the choices im working between.
1. Fiugre out what type to return, what the other inputs accept, and what blocks to shadow from what's already in there.
    - Pros:
        - No extra clicks
        - Intuative once understood
        - Strictly typed, impossible to make an "invalid" combo
    - Cons:
        - In order for this to work at its best, the number shadows can only be considered once something is already in.
        - This has the issue of not being explained to the user at all.
        - Annoying to implement
2. We use a mutator icon and let the user select types for each input manually.
    - Pros:
        - Extremely intuative
        - Strictly typed, impossible to make an "invalid" combo
        - Somewhat simple to implement
    - Cons:
        - This would still require figuring out what type to return from the combonation.
        - Requires extra clicks
        - Makes the operator blocks longer
3. Warning/Disconnect on invalid input combinations.
    - Pros:
        - Intuative
        - Simple to implement
    - Cons:
        - Not strictly typed, someone could make a valid combination but put it somewhere where it doesnt belong.
4. Give up and just let errors happen (Current choice)
    - Pros:
        - Extremely easy to implement.
    - Cons:
        - Definetly not strictly typed, errors will need to be accounted for in both inputs and output,
        which breaks my ideal design of no errors.
        - Not obvious, it's not clear to the user you can put more than numbers in the operator blocks.
5. Giving up even harder and making a bunch of blocks
    - Pros:
        - Easy to implement.
        - Extremely Intuative
    - Cons:
        - Nobody is gonna want to use MarchBlocks if there's 50 different blocks just to do the same thing to different types.
        - Clutters toolbox.

If someone can find a solution thats easy enough to implement, doesnt make the block bigger, and is intuative to the user, i'd be a very
happy man.
*/

Blockly.Blocks["operators_add"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("+");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_subtract"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("-");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_multiply"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("*");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_divide"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("/");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    }
};

Blockly.Blocks["operators_power"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("^");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_modulus"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("mod");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_rounding"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
            new Blockly.FieldDropdown(
                [
                    ["round","round"],
                    ["ceilling", "ceil"],
                    ["floor", "floor"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};


Blockly.Blocks["operators_trig"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
            new Blockly.FieldDropdown(
                [
                    ["sine of","sin"],
                    ["cosine of", "cos"],
                    ["tangent of", "tan"]
                ]
            ),
            "OPERATION");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_unary"] = { // square root of, fractional of, negate, absolute value of, sign of, exp, log, exp2, log2
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
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
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_mix"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("mix");
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("and");
        this.appendValueInput("BY").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("by");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_bounds"] = { // min and max
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField(
            new Blockly.FieldDropdown(
                [
                    ["max of", "max"],
                    ["min of", "min"],
                ]
            ),
            "OPERATION");
        this.appendValueInput("B").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("and");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_clamp"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("NUMBER").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("clamp");
        this.appendValueInput("MIN").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("between");
        this.appendValueInput("MAX").setCheck(["Number", "Vector2", "Vector3", "Vector4", "Color"]).appendField("and");
        this.setOutput(true, ["Number", "Vector2", "Vector3", "Vector4", "Color"]);
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_equals"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A");
        this.appendValueInput("B").appendField("=");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_not_equals"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A");
        this.appendValueInput("B").appendField("≠");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_less_than"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("<");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_less_than_or_equal"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("≤");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_greater_than"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField(">");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_greater_than_or_equal"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField("≥");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_and"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField("and");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_or"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField("or");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_not"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendValueInput("BOOLEAN").setCheck("Boolean").appendField("not");
        this.setOutput(true, "Boolean");
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_true"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("true");
        this.setOutput(true, "Boolean")
        this.setStyle("operators_blocks");
    },
};

Blockly.Blocks["operators_false"] = {
    init: function (this: Blockly.Block) {
        this.setInputsInline(true);
        this.appendDummyInput().appendField("false");
        this.setOutput(true, "Boolean")
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