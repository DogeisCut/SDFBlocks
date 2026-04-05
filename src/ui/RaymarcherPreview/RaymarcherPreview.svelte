<script lang="ts">
    import { draggable } from "@neodrag/svelte";
    import { makeGraphics, startLoop } from "../../compilier"
    import { onMount } from "svelte";
    
    import type { EditorState } from "../Editor.svelte"
    import type { ProjectSettings } from "../Editor.svelte"
    import type { SavedEditorState } from "../Editor.svelte"

    interface RaymarcherPreviewProps {
        editorState: EditorState,
        projectSettings: ProjectSettings,
        savedEditorState: SavedEditorState
    }

    const props: RaymarcherPreviewProps = $props()

    onMount(() => {
        makeGraphics(props.editorState.canvas)
        startLoop()
    })
</script>

<canvas bind:this={props.editorState.canvas} use:draggable={{ bounds: 'parent' }}
    width={props.projectSettings.size[0]}
    height={props.projectSettings.size[1]}
    id="raymarcherCanvas"
    style:width='{props.savedEditorState.preview.size[0]}px'
    style:height='{props.savedEditorState.preview.size[1]}px'
>
</canvas>

<style>
    canvas {
        object-fit: contain; 
        image-rendering: pixelated;
        position: absolute;
        top: 16px;
        right: 16px;
        background-color: #1e1e1e;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        z-index: 71;
        border: 1px solid #444;
        overflow: hidden;
    }
</style>