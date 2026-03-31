import * as Blockly from "blockly";

export type GLSLType = "Number" | "Vector2" | "Vector3" | "Vector4" | "Color" | "Boolean" | "SDF" | "Surface";
export type NumericGLSLType = Extract<GLSLType, "Number" | "Vector2" | "Vector3" | "Vector4" | "Color">;

export const NUMERIC_TYPES: NumericGLSLType[] = ["Number", "Vector2", "Vector3", "Vector4", "Color"];

export function normalizeVec(t: NumericGLSLType): NumericGLSLType {
    return t === "Color" ? "Vector3" : t;
}

export function withAlias(t: NumericGLSLType): NumericGLSLType[] {
    if (t === "Vector3") return ["Vector3", "Color"];
    if (t === "Color")   return ["Color", "Vector3"];
    return [t];
}

export function compatiblePair(knownType: NumericGLSLType): NumericGLSLType[] {
    const norm = normalizeVec(knownType);
    if (norm === "Number") return NUMERIC_TYPES;
    return [...new Set<NumericGLSLType>(["Number", ...withAlias(knownType)])];
}

export function resolveOutputType(
    aType: NumericGLSLType | null,
    bType: NumericGLSLType | null
): NumericGLSLType[] {
    if (!aType && !bType) return NUMERIC_TYPES;

    const a = aType ? normalizeVec(aType) : null;
    const b = bType ? normalizeVec(bType) : null;

    if (!a) return b === "Number" ? NUMERIC_TYPES : withAlias(bType!);
    if (!b) return a === "Number" ? NUMERIC_TYPES : withAlias(aType!);

    if (a === "Number" && b === "Number") return ["Number"];
    if (a === "Number") return withAlias(bType!);
    if (b === "Number") return withAlias(aType!);
    if (a === b) return withAlias(aType!);

    return NUMERIC_TYPES;
}


export function getConnectedType(block: Blockly.Block, inputName: string): NumericGLSLType | null {
    const target = block.getInput(inputName)?.connection?.targetBlock();
    if (!target || target.isShadow()) return null;

    const checks = target.outputConnection?.getCheck() as GLSLType[] | null;
    if (!checks || checks.length === 0) return null;

    if (checks.length === 1) return checks[0] as NumericGLSLType;

    if (checks.length === 2 && checks.includes("Vector3") && checks.includes("Color")) {
        return "Vector3";
    }

    return null;
}