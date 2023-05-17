<script>
    import GradeFactory from "$lib/gradeFactory";

	export let maxPoints = 100;
    const gradeFactory = new GradeFactory();
    const grades = gradeFactory.generate();
</script>

<div class="grow text-4xl overflow-auto p-8">
    <div>Current Max Score: {maxPoints}</div>
    <ul>
        {#each grades as grade, i}
		    <li>{grade.label}: {grade.base}</li>
	    {/each}
    </ul>
</div>