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
        ${block("scene_set_clear_color", value("COLOR", shadowColor("#000000")))}
        ${block("scene_set_fog", value("MIN", shadowFloat(100)), value("MAX", shadowFloat(1000)))}
    </category>

    <category name="Surfaces" colour="${c.surfaces_blocks.colourPrimary}">
        ${block("surfaces_generic_surface")}
        ${block("surfaces_create_surface", value("COLOR", shadowColor("#ffffff")), value("ROUGHNESS", shadowUnitFloat(1)), value("METALLICITY", shadowUnitFloat(0)), value("EMISSION", shadowUnitFloat(0)))}
    </category>

    <category name="SDFs" colour="${c.sdfs_blocks.colourPrimary}">
        ${block("sdfs_nothing")}
        ${block("sdfs_sphere", value("SURFACE", shadow("surfaces_generic_surface")), value("RADIUS", shadowFloat(1)))}
    </category>

    <category name="SDF Operations" colour="${c.sdf_operations_blocks.colourPrimary}">
        ${block("sdf_operations_union", value("A", shadow("sdfs_nothing")), value("B", shadow("sdfs_nothing")))}
        ${block("sdf_operations_smooth_union", value("A", shadow("sdfs_nothing")), value("B", shadow("sdfs_nothing")), value("SMOOTHNESS", shadowFloat(5)))}
    </category>

    <category name="Transform Operations" colour="${c.transform_operations_blocks.colourPrimary}">
        ${block("transfom_operations_current_transform")}
        ${block("transform_operations_translate", value("POSITION", shadow("values_vector3")))}
    </category>

    <category name="Color" colour="${c.color_blocks.colourPrimary}">
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
    </category>

    <category name="Operators" colour="${c.operators_blocks.colourPrimary}">
    </category>

    <category name="Sensing" colour="${c.sensing_blocks.colourPrimary}">
    </category>

    <category name="Labeling" colour="${c.labeling_blocks.colourPrimary}">
    </category>

    <category name="Variables" colour="${c.variables_blocks.colourPrimary}">
    </category>

    <category name="Functions" colour="${c.functions_blocks.colourPrimary}">
    </category>
`;

export default toolbox;