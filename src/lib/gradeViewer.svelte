<script>
    /** @type {import('$lib/gradeFactory').Grade[]}*/
	export let grades;
</script>

<div class="grow text-4xl overflow-auto p-8">
    <ul>
        {#each grades as grade, i}
            {#if grade.min === grade.max}
                <li>{grade.label}: {grade.max}</li>
            {:else}
                <li>{grade.label}: {grade.min}-{grade.max}</li>
            {/if}
            {#if grade.children}
                <svelte:self grades={grade.children}/>
            {/if}
	    {/each}
    </ul>
</div>