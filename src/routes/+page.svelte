<script>
    import GradeFactory from '$lib/gradeFactory';
	import GradeListViewer from '$lib/gradeListViewer.svelte';
    let maxScore = 100;
    let setId = 'AT';

	let lastValue = maxScore;
	const gradeFactory = new GradeFactory();
	const definitionSets = gradeFactory.getGradeDefinitions().map(c => c.id);

	/**
     * @param {HTMLInputElement} node
     * @param {number} value
     */
	function validator(node, value) {
    return {
		/**
		 * @param {number} value
		 */
      update(value) {
		maxScore = maxScore > parseInt(node.max) || maxScore < parseInt(node.min) ? lastValue : value;
		lastValue = maxScore;
      }
    }
  }

</script>
<div class="flex min-h-[100dvh] max-h-screen flex-col items-center justify-between p-8 gap-4">
    <GradeListViewer factory={gradeFactory} maxPoints={maxScore || 0} setId={setId} ></GradeListViewer>
	<form>
		<select bind:value={setId}>
			{#each definitionSets as set, i}
				<option value="{set}">{set}</option>
			{/each}
		</select>
		<input class="text-3xl text-center shadow appearance-none border rounded 
		w-28 py-4 px-4 text-gray-700 mb-3 leading-tight 
		focus:outline-none focus:shadow-outline" 
		bind:value={maxScore}
		use:validator={maxScore}
		type="number" 
		id="maxScoreInput"
		min="0" 
		max="1000" 
		step="1">
	</form>


    <div class="text-xl">© ovid 2023</div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
