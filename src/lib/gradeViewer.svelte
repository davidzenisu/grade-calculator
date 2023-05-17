<script>
    import GradeFactory from "$lib/gradeFactory";

	export let maxPoints = 100;
    const gradeFactory = new GradeFactory();
    $: grades = gradeFactory.generate({ max: maxPoints });
</script>

<div class="grow text-4xl overflow-auto p-8">
    <ul>
        {#each grades as grade, i}
		    <li>{grade.label}: {grade.max}-{grade.min}</li>
	    {/each}
    </ul>
</div>