<script>
    /** @type {import('$lib/gradeFactory').Grade[]}*/
	export let grades;
    export let indent = 0;
    const indentIncrement = 4;
</script>

{#each grades as grade, i}
    <div class="flex flex-row px-{indent} gap-16 justify-between">
        <div>{grade.label}:</div>
        {#if grade.min === grade.max}
            <div >{grade.max}</div>
        {:else}
            <div>{grade.min}-{grade.max}</div>
        {/if}
    </div>
    {#if grade.children}
        <svelte:self grades={grade.children} indent={indent+indentIncrement}/>
    {/if}
{/each}