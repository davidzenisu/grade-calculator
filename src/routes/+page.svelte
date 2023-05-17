<script>
	import GradeListViewer from '$lib/gradeListViewer.svelte';
    let maxScore = 100;
</script>

<div class="flex min-h-screen max-h-screen flex-col items-center justify-between p-8 gap-4">
    <input class="text-3xl text-center shadow appearance-none border rounded 
	w-28 py-4 px-4 text-gray-700 mb-3 leading-tight 
	focus:outline-none focus:shadow-outline" 
	bind:value={maxScore}
	type="number" 
	id="weatherId"
	min="1" 
	max="1000" 
	step="1">
    <GradeListViewer maxPoints={maxScore || 0}></GradeListViewer>
    <div class="text-xl">© ovid 2023</div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
