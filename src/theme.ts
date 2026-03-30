import * as Blockly from "blockly";

const blockStyles = {
    scene_blocks: {
        colourPrimary: "#535553",
    },
    surfaces_blocks: {
        colourPrimary: "#6fe2b2",
    },
    sdfs_blocks: {
        colourPrimary: "#5b81ff",
    },
    combiners_blocks: {
        colourPrimary: "#3c3ad6",
    },
    transforms_blocks: {
        colourPrimary: "#8132a1",
    },
    color_blocks: {
        colourPrimary: "#e46bd4",
    },
    vectors_blocks: {
        colourPrimary: "#f83d3d",
    },
    vector4_blocks: {
        colourPrimary: "#f84a3d",
    },
    vector3_blocks: {
        colourPrimary: "#f8693d",
    },
    vector2_blocks: {
        colourPrimary: "#f8783d",
    },
    control_blocks: {
        colourPrimary: "#f8ad3d",
    },
    operators_blocks: {
        colourPrimary: "#54cf43",
    },
    sensing_blocks: {
        colourPrimary: "#6bc8e4",
    },
    labeling_blocks: {
        colourPrimary: "#999999",
    },
    variables_blocks: {
        colourPrimary: "#fd9813",
    },
    functions_blocks: {
        colourPrimary: "#f06482",
    },
    values: {
        colourPrimary: "#ffffff",
        colourSecondary: "#ffffff",
        colourTertiary:'#ffffff'
    },
};

const theme = Blockly.Theme.defineTheme('MarchBlocks', {
    name: "MarchBlocks",
    base: Blockly.Themes.Classic,
    startHats: true,
    blockStyles,
    componentStyles: {
        workspaceBackgroundColour: "#1a251b",
        toolboxBackgroundColour: "#303630",
        toolboxForegroundColour: "#fff",
        flyoutBackgroundColour: "#212722",
        flyoutForegroundColour: "#ccc",
        flyoutOpacity: 1,
        scrollbarColour: "#797979",
        insertionMarkerColour: "#fff",
        insertionMarkerOpacity: 0.3,
        scrollbarOpacity: 0.4,
        cursorColour: "#d0d0d0",
    },
});

export default theme