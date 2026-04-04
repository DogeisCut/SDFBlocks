<script lang="ts">
    import type { Snippet } from "svelte";

    const props: {
        text: string,
        children?: Snippet
    } = $props()

    let open: boolean = $state(false)
</script>

<div class="dropdown">
    <button onclick={() => open = !open} class="dropbtn">
        {props.text} <span class="arrow">▼</span>
    </button>
    {#if open}
        <div class="dropdown-content">
            {@render props.children?.()}
        </div>
    {/if}
</div>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropbtn {
        background: none;
        border: none;
        color: white;
        padding: 8px 12px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
    }
    .dropbtn:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .dropdown-content {
        display: block;
        position: absolute;
        top: 40px;
        background-color: #ffffff;
        min-width: 200px;
        box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
        z-index: 101;
        border-radius: 0px 0px 4px 4px;
        border: 1px solid #ddd;
    }

    .arrow {
        font-size: 8px;
        vertical-align: middle;
        opacity: 0.8;
        pointer-events: none;
    }
</style>