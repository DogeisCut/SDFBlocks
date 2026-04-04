<script lang="ts">
    import { draggable } from "@neodrag/svelte";
    import { makeGraphics, startLoop } from "../../compilier"
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement

    const props: { 
        size: [number, number]
        previewSize: [number, number]
    } = $props()

    onMount(() => {
        makeGraphics(canvas)
        startLoop()
    })
</script>

<canvas bind:this={canvas} use:draggable 
width={props.previewSize[0]}
height={props.previewSize[1]}
id="raymarcherCanvas"
style:width={props.size[0]}
style:height={props.size[1]}
>
</canvas>

<style>
    canvas {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain; 
        image-rendering: pixelated;
        position: absolute;
        top: 20px;
        right: 20px;
        background-color: #1e1e1e;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        z-index: 71;
        border: 1px solid #444;
        overflow: hidden;
        
        min-width: 200px;
        min-height: 150px;
    }
</style>