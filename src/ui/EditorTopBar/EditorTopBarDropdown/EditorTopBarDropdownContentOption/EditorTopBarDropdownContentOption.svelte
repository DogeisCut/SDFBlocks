<script lang="ts">
    import type { Snippet } from "svelte";

    interface EditorTopBarDropdownContentOptionProps {
        onclick: () => void
        children?: Snippet
    }

    const props: EditorTopBarDropdownContentOptionProps = $props()
</script>


<button type="button" onclick={props.onclick}>{@render props.children?.()}</button>

<style>
    button {
        background: none;
        border: none;
        text-align: left;
        width: 100%;
        cursor: pointer;
        font-family: inherit;
        
        color: #333;
        padding: 10px 14px;
        text-decoration: none;
        display: block;
        font-size: 13px;
    }

    button:hover {
        background-color: #f1f1f1;
    }
</style>