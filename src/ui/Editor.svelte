<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as Blockly from "blockly";
    import { registerContinuousToolbox } from '@blockly/continuous-toolbox';
    import toolbox from "../toolbox";
    import theme from "../theme";
    import * as Compiler from "../compilier";
    import AlphaWarning from "./AlphaWarning/AlphaWarning.svelte";
    import RaymarcherPreview from "./RaymarcherPreview/RaymarcherPreview.svelte";
    import EditorTopBar from "./EditorTopBar/EditorTopBar.svelte";

    Object.keys(Blockly.Blocks).forEach(key => delete Blockly.Blocks[key]);
    import.meta.glob('../blocks/*.ts', { eager: true });

    let editorState:
    {
        preview: {
            positon: [number, number],
            size: [number, number]
        },
        projectSize: [number, number]
    }
    = $state({
        preview: {
            positon: [0, 0],
            size: [1920/2, 1280/2]
        },
        projectSize: [1920, 1280]
    })

    registerContinuousToolbox();
    
    let blocklyDiv: HTMLDivElement | null = null;
    let workspace: Blockly.WorkspaceSvg | null = null;

    onMount(() => {
        if (!blocklyDiv) return;

        const toolboxElement = document.createElement("xml");
        toolboxElement.innerHTML = toolbox;

        workspace = Blockly.inject(blocklyDiv, {
            toolbox: toolboxElement,
            collapse: true,
            comments: true,
            css: true,
            disable: true,
            grid: {
                spacing: 20,
                length: 1,
                colour: '#ccc',
                snap: false,
            },
            horizontalLayout: false,
            maxBlocks: Infinity,
            maxTrashcanContents: 0,
            media: 'https://blockly-demo.appspot.com/static/media/',
            modalInputs: true,
            move: {
                scrollbars: {
                    horizontal: true,
                    vertical: true
                },
                drag: true,
                wheel: true
            },
            oneBasedIndex: false,
            plugins: {
                flyoutsVerticalToolbox: 'ContinuousFlyout',
                metricsManager: 'ContinuousMetrics',
                toolbox: 'ContinuousToolbox',
            },
            readOnly: false,
            renderer: 'zelos',
            rtl: false,
            scrollbars: true,
            sounds: true,
            theme: theme,
            toolboxPosition: 'start',
            trashcan: false,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 0.8,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2,
                pinch: true
            },
        });

        const defaultWorkspaceElement = document.createElement("xml")
        defaultWorkspaceElement.innerHTML = `<block type="scene" id="scene" deletable="false" editable="false" x="0" y="0">
            <value name="CLEAR_COLOR">
            <shadow type="values_color">
                <field name="COLOR">#bae6f3</field>
            </shadow>
            </value>
            <value name="CAMERA_POSITION">
            <shadow type="values_vector3">
                <field name="X">0</field>
                <field name="Y">1</field>
                <field name="Z">-5</field>
            </shadow>
            <block type="vectors_vector3">
                <value name="X">
                <shadow type="values_float">
                    <field name="NUMBER">0</field>
                </shadow>
                <block type="operators_multiply">
                    <value name="A">
                    <shadow type="values_float">
                        <field name="NUMBER">0</field>
                    </shadow>
                    <block type="operators_trig">
                        <field name="OPERATION">sin</field>
                        <value name="NUMBER">
                        <shadow type="values_float">
                            <field name="NUMBER">0</field>
                        </shadow>
                        <block type="operators_multiply">
                            <value name="A">
                            <shadow type="values_float">
                                <field name="NUMBER">0</field>
                            </shadow>
                            <block type="sensing_timer"></block>
                            </value>
                            <value name="B">
                            <shadow type="values_float" id="9vJb7^!OtTEGM8lD!l0-">
                                <field name="NUMBER">90</field>
                            </shadow>
                            </value>
                        </block>
                        </value>
                    </block>
                    </value>
                    <value name="B">
                    <shadow type="values_float">
                        <field name="NUMBER">-5</field>
                    </shadow>
                    </value>
                </block>
                </value>
                <value name="Y">
                <shadow type="values_float">
                    <field name="NUMBER">2</field>
                </shadow>
                </value>
                <value name="Z">
                <shadow type="values_float">
                    <field name="NUMBER">0</field>
                </shadow>
                <block type="operators_multiply" id="Lj4#-n0~t?w]$,QkVAFV">
                    <value name="A">
                    <shadow type="values_float">
                        <field name="NUMBER">0</field>
                    </shadow>
                    <block type="operators_trig">
                        <field name="OPERATION">cos</field>
                        <value name="NUMBER">
                        <shadow type="values_float">
                            <field name="NUMBER">0</field>
                        </shadow>
                        <block type="operators_multiply">
                            <value name="A">
                            <shadow type="values_float">
                                <field name="NUMBER">0</field>
                            </shadow>
                            <block type="sensing_timer"></block>
                            </value>
                            <value name="B">
                            <shadow type="values_float" >
                                <field name="NUMBER">90</field>
                            </shadow>
                            </value>
                        </block>
                        </value>
                    </block>
                    </value>
                    <value name="B">
                    <shadow type="values_float">
                        <field name="NUMBER">-5</field>
                    </shadow>
                    </value>
                </block>
                </value>
            </block>
            </value>
            <value name="CAMERA_ANGLE">
            <shadow type="values_vector3">
                <field name="X">0</field>
                <field name="Y">0</field>
                <field name="Z">0</field>
            </shadow>
            <block type="vectors_vector3">
                <value name="X">
                <shadow type="values_float">
                    <field name="NUMBER">23</field>
                </shadow>
                </value>
                <value name="Y">
                <shadow type="values_float">
                    <field name="NUMBER">0</field>
                </shadow>
                <block type="operators_multiply">
                    <value name="A">
                    <shadow type="values_float">
                        <field name="NUMBER">0</field>
                    </shadow>
                    <block type="sensing_timer"></block>
                    </value>
                    <value name="B">
                    <shadow type="values_float">
                        <field name="NUMBER">90</field>
                    </shadow>
                    </value>
                </block>
                </value>
                <value name="Z">
                <shadow type="values_float">
                    <field name="NUMBER">0</field>
                </shadow>
                </value>
            </block>
            </value>
            <value name="FOV">
            <shadow type="values_positive_float">
                <field name="NUMBER">75</field>
            </shadow>
            </value>
            <value name="CONTROLS">
            <shadow type="values_boolean">
                <field name="BOOLEAN">FALSE</field>
            </shadow>
            </value>
            <statement name="SCENE">
            <block type="scene_set_scene">
                <value name="SDF">
                <shadow type="values_sdf"></shadow>
                <block type="primatives_box">
                    <value name="SURFACE">
                    <shadow type="values_surface"></shadow>
                    </value>
                    <value name="SIZE">
                    <shadow type="values_vector3">
                        <field name="X">1</field>
                        <field name="Y">1</field>
                        <field name="Z">1</field>
                    </shadow>
                    </value>
                    <value name="POSITION">
                    <shadow type="values_position"></shadow>
                    </value>
                </block>
                </value>
            </block>
            </statement>
        </block>
        `

        Blockly.Xml.domToWorkspace(defaultWorkspaceElement, workspace)

        workspace.addChangeListener(Blockly.Events.disableOrphans);

        const listener = (e: Blockly.Events.Abstract) => {
            if (
                e.isUiEvent ||
                e.type === Blockly.Events.FINISHED_LOADING ||
                workspace?.isDragging()
            )
                return;
            Compiler.compile(workspace!);
        };

        workspace.addChangeListener(listener);

        onDestroy(() => {
            workspace?.removeChangeListener(listener);
            workspace?.dispose();
            workspace = null;
        });
    });
</script>

<div id="appContainer">
    <EditorTopBar />
    <div id="pageContainer">
        <div bind:this={blocklyDiv} id="blocklyDiv"></div>
        <RaymarcherPreview 
        size={editorState.projectSize}
        previewSize={editorState.preview.size}
        />
    </div>
</div>
<AlphaWarning />

<style>
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    :global(#appContainer) {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    #pageContainer {
        position: relative;
        flex: 1;
        width: 100%;
        overflow: hidden;
    }

    #blocklyDiv {
        width: 100%;
        height: 100%;
    }
</style>
