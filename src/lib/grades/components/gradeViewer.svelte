<script>
    import Grade from "$lib/grades/components/grade.svelte";
    /** @type {import('$lib/grades/gradeFactory').Grade[]}*/
	export let grades;
    export let indent = 0;
    const indentIncrement = 8;
</script>

{#each grades as grade, i}
    <Grade grade={grade} indent={indent}></Grade>
    {#if grade.children}
        <svelte:self grades={grade.children} indent={indent+indentIncrement}/>
    {/if}
{/each}