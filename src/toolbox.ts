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
        ${block("scene_set_scene", value("SDF", shadow("values_sdf")))}
        ${block("scene_append_to_scene", value("SDF", shadow("values_sdf")))}
        ${block("scene_current_scene")}
        ${sep(50)}
        ${block("scene_customize_shadows")}
        ${block("scene_customize_shading")}
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
        ${block("primatives_plane")}
        ${block("primatives_box")}
        ${block("primatives_round_box")}
        ${block("primatives_cone")}
        ${block("primatives_torus")}
        ${block("primatives_capsule")}
        ${block("primatives_capped_cylinder")}
        ${block("primatives_rounded_cylinder")}
        ${block("primatives_round_cone")}
        ${block("primatives_ellipsoid")}
    </category>

    <category name="Combiners" colour="${c.combiners_blocks.colourPrimary}">
        ${block("combiners_union", value("A", shadow("values_sdf")), value("B", shadow("values_sdf")))}
        ${block("combiners_smooth_union", value("A", shadow("values_sdf")), value("B", shadow("values_sdf")), value("SMOOTHNESS", shadowFloat(5)))}
        ${block("combiners_subtract")}
        ${block("combiners_smooth_subtract")}
        ${block("combiners_intersect")}
        ${block("combiners_smooth_intersect")}
        ${block("combiners_paint")}
        ${block("combiners_smooth_paint")}
    </category>

    <category name="Transforms" colour="${c.transforms_blocks.colourPrimary}">
        ${block("transfoms_current_transform")}
        ${block("transforms_translate", value("SDF", shadow("values_sdf")), value("POSITION", shadow("values_vector3")))}
        ${block("transforms_rotate_around_axis")}
        ${block("transforms_repeat")}
        ${block("transforms_twist")}
        ${block("transforms_bend")}
    </category>

    <category name="Color" colour="${c.color_blocks.colourPrimary}">
        ${block("color_r_g_b", value("R", shadowUnitFloat(1)), value("G", shadowUnitFloat(0)), value("B", shadowUnitFloat(0)))}
        ${block("color_h_s_v")}
        ${sep(50)}
        ${block("color_blend", value("A", shadowColor()), value("B", shadowColor("#000000")), value("BY", shadowUnitFloat()))}
        ${sep(50)}
        ${block("color_get_r")}
        ${block("color_get_g")}
        ${block("color_get_b")}
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
        ${sep(50)}
        ${block("vectors_vector2_z")}
        ${block("vectors_vector3_w")}
        ${sep(50)}
        ${block("vectors_components2")}
        ${block("vectors_components3")}
        ${block("vectors_components4")}
        ${sep(50)}
        ${block("vectors_length_of")}
    </category>

    <category name="Control" colour="${c.control_blocks.colourPrimary}">
        ${block("control_if")}
        ${block("control_if_else")}
        ${sep(50)}
        ${block("control_repeat")}
        ${block("control_while")}
        ${block("control_do_while")}
        ${block("control_loop_index")}
        ${sep(50)}
        ${block("control_continue")}
        ${block("control_break")}
        ${block("control_discard")}
    </category>

    <category name="Operators" colour="${c.operators_blocks.colourPrimary}">
        ${block("operators_add", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_subtract", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_multiply", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_divide", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_power", value("A", shadowFloat(0)), value("B", shadowFloat(0)))}
        ${block("operators_modulus")}
        ${sep(50)}
        ${block("operators_rounding")}
        ${sep(50)}
        ${block("operators_trig")}
        ${sep(50)}
        ${block("operators_unary")}
        ${sep(50)}
        ${block("operators_mix")}
        ${sep(50)}
        ${block("operators_bounds")}
        ${block("operators_clamp")}
        ${sep(50)}
        ${block("operators_equals")}
        ${block("operators_not_equals")}
        ${block("operators_less_than")}
        ${block("operators_less_than_or_equal")}
        ${block("operators_greater_than")}
        ${block("operators_greater_than_or_equal")}
        ${sep(50)}
        ${block("operators_and")}
        ${block("operators_or")}
        ${block("operators_not")}
        ${sep(50)}
        ${block("operators_true")}
        ${block("operators_false")}
    </category>

    <category name="Sensing" colour="${c.sensing_blocks.colourPrimary}">
        ${block("sensing_timer")}
        ${sep(50)}
        ${block("sensing_set_camera_position")}
        ${block("sensing_set_camera_angle")}
        ${sep(50)}
        ${block("sensing_camera_position")}
        ${block("sensing_camera_angle")}
        ${sep(50)}
        ${block("sensing_resolution")}
        ${sep(50)}
        ${block("sensing_fragment_coord")}
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