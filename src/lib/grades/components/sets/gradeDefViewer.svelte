<script>
    import GradeDef from "$lib/grades/components/sets/gradeDef.svelte";
    /** @type {import('$lib/grades/gradeFactory').GradeDefinition[]}*/
    export let gradeDefs;
    export let indent = 0;
    const indentIncrement = 8;
</script>

{#each gradeDefs as gradeDef, i}
    <GradeDef {gradeDef} {indent} />
    {#if gradeDef.children}
        <svelte:self
            gradeDefs={gradeDef.children}
            indent={indent + indentIncrement}
        />
    {/if}
{/each}
