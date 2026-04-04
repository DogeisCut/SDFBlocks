<script lang="ts">
    import EditorTopBarDropdown from "./EditorTopBarDropdown/EditorTopBarDropdown.svelte";
</script>

<header>
    <div class="header-left">
        <!--EditorTopBarLogo-->

        <EditorTopBarDropdown text="File">
            <!--EditorTopBarDropdownContentActionButton text="New" callback={function here}-->
            <!--EditorTopBarDropdownContentSeperator-->
            <!--EditorTopBarDropdownContentActionButton text="Load form Computer" callback={function here}-->
            <!--EditorTopBarDropdownContentSeperator-->
            <!--EditorTopBarDropdownContentActionButton text="Save as..." callback={function here}-->
            <!--EditorTopBarDropdownContentActionButton text="Save to seperate file" callback={function here}-->
        </EditorTopBarDropdown>

        <EditorTopBarDropdown text="Edit">
            <!--EditorTopBarDropdownContentActionButton text="Undo" callback={function here}-->
            <!--EditorTopBarDropdownContentActionButton text="Redo" callback={function here}-->
        </EditorTopBarDropdown>

        <EditorTopBarDropdown text="Settings">
            <!--EditorTopBarDropdownContentModalButton text="Editor Settings"-->
            <!--EditorTopBarDropdownContentModalButton text="Project Settings"-->
        </EditorTopBarDropdown>

        <!--EditorTopBarSeperator-->

        <!--EditorTopBarProjectName-->

        <!--EditorTopBarSeperator-->

        <!--EditorTopBarLinkButton newPage="true" href="examples.html" text="Examples"-->
    </div>

    <div class="header-right">
        <!--{#if canSave}
            <EditorTopBarActionButton text="Save" callback={function here}/>
        {/if}-->
        
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        background-color: #4C97FF;
        padding: 0 12px;
        color: white;
        z-index: 100;
    }
    .header-left, .header-right {
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>