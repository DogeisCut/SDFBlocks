<script lang="ts">
    import type { Snippet } from "svelte";

    interface EditorTopBarDropdownContentOptionProps {
        onclick: () => void
        children?: Snippet
    }

    const props: EditorTopBarDropdownContentOptionProps = $props()
</script>


<a href="#" onclick={props.onclick}>{@render props.children?.()}</a>

<style>
    a {
        color: #333;
        padding: 10px 14px;
        text-decoration: none;
        display: block;
        font-size: 13px;
    }
    a:hover {
        background-color: #f1f1f1;
    }
    
</style>