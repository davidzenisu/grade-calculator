<script>
    /** @type {import('$lib/gradeFactory').Grade[]}*/
	export let grades;
    export let indent = 0;
    const indentIncrement = 4;
</script>

{#each grades as grade, i}
    {#if grade.min === grade.max}
        <div class="pl-{indent}">{grade.label}: {grade.max}</div>
    {:else}
        <div class="pl-{indent}">{grade.label}: {grade.min}-{grade.max}</div>
    {/if}
    {#if grade.children}
        <svelte:self grades={grade.children} indent={indent+indentIncrement}/>
    {/if}
{/each}