import theme from "./theme";

function block(type: string, ...extra: string[]): string {
    return `<block type="${type}">${extra?.join?.("")}</block>`;
}
function value(name: string, ...extra: string[]): string {
    return `<value name="${name}">${extra?.join?.("")}</value>`;
}
function shadow(type: string, ...extra: string[]): string {
    return `<shadow type="${type}">${extra?.join?.("")}</shadow>`;
}
function sep(sep: number = 30): string {
    return `<sep gap="${sep}"></sep>`;
}
function shadowFloat(value: number = 10): string {
    return `<shadow type="values_float"><field name="NUMBER">${value}</field></shadow>`;
}
function shadowUnitFloat(value: number = 0.5): string {
    return `<shadow type="values_unit_float"><field name="NUMBER">${value}</field></shadow>`;
}
function shadowBoolean(value: boolean = false): string {
    return `<shadow type="values_boolean"><field name="BOOLEAN">${value ? 'TRUE' : 'FALSE'}</field></shadow>`;
}
function shadowColor(color: string = "#ff0000"): string {
    return `<shadow type="values_color"><field name="COLOR">${color}</field></shadow>`;
}
const c = theme.blockStyles
const toolbox = `
    <category name="Scene" colour="${c.scene_blocks.colourPrimary}">
        ${block("scene_current_scene")}
        ${block("scene_set_scene", value("SDF", shadow("sdfs_nothing")))}
        ${sep(50)}
        ${block("scene_set_clear_color", value("COLOR", shadowColor("#000000")))}
        ${block("scene_set_fog", value("MIN", shadowFloat(100)), value("MAX", shadowFloat(1000)))}
    </category>

    <category name="Surfaces" colour="${c.surfaces_blocks.colourPrimary}">
        ${block("surfaces_generic_surface")}
        ${block("surfaces_create_surface", value("COLOR", shadowColor("#ffffff")), value("ROUGHNESS", shadowUnitFloat(1)), value("METALLICITY", shadowUnitFloat(0)), value("EMISSION", shadowUnitFloat(0)))}
    </category>

    <category name="Primatives" colour="${c.primatives_blocks.colourPrimary}">
        ${block("primatives_nothing")}
        ${block("primatives_sphere", value("SURFACE", shadow("values_surface")), value("RADIUS", shadowFloat(1)))}
    </category>

    <category name="Combiners" colour="${c.combiners_blocks.colourPrimary}">
        ${block("combiners_union", value("A", shadow("values_sdf")), value("B", shadow("values_sdf")))}
        ${block("combiners_smooth_union", value("A", shadow("values_sdf")), value("B", shadow("values_sdf")), value("SMOOTHNESS", shadowFloat(5)))}
    </category>

    <category name="Transforms" colour="${c.transforms_blocks.colourPrimary}">
        ${block("transfoms_current_transform")}
        ${block("transforms_translate", value("SDF", shadow("values_sdf")), value("POSITION", shadow("values_vector3")))}
    </category>

    <category name="Color" colour="${c.color_blocks.colourPrimary}">
        ${block("color_r_g_b", value("R", shadowUnitFloat(1)), value("G", shadowUnitFloat(0)), value("B", shadowUnitFloat(0)))}
        ${sep(50)}
        ${block("color_blend", value("A", shadowColor()), value("B", shadowColor("#000000")), value("BY", shadowUnitFloat()))}
    </category>

    <category name="Vectors" colour="${c.vectors_blocks.colourPrimary}">
        ${block("vectors_vector2", value("X", shadowFloat(0)), value("Y", shadowFloat(0)))}
        ${block("vectors_vector3", value("X", shadowFloat(0)), value("Y", shadowFloat(0)), value("Z", shadowFloat(0)))}
        ${block("vectors_vector4", value("X", shadowFloat(0)), value("Y", shadowFloat(0)), value("Z", shadowFloat(0)), value("W", shadowFloat(0)))}
        ${sep(50)}
        ${block("vectors_x_of", value("VECTOR", shadow("values_vector2")))}
        ${block("vectors_y_of", value("VECTOR", shadow("values_vector2")))}
        ${block("vectors_z_of", value("VECTOR", shadow("values_vector3")))}
        ${block("vectors_w_of", value("VECTOR", shadow("values_vector4")))}
    </category>

    <category name="Control" colour="${c.control_blocks.colourPrimary}">
        ${block("control_if")}
        ${block("control_if_else")}
    </category>

    <category name="Operators" colour="${c.operators_blocks.colourPrimary}">
        ${block("operators_add", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_subtract", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_multiply", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_divide", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_power", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
    </category>

    <category name="Sensing" colour="${c.sensing_blocks.colourPrimary}">
        ${block("sensing_timer")}
    </category>

    <category name="Labeling" colour="${c.labeling_blocks.colourPrimary}">
        ${block("labeling_label")}
    </category>

    <category name="Variables" colour="${c.variables_blocks.colourPrimary}" custom="VARIABLE">
    </category>

    <category name="Functions" colour="${c.functions_blocks.colourPrimary}" custom="PROCEDURE">
    </category>
`;

export default toolbox;