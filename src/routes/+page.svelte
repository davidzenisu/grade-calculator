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
	<div class="w-[28rem] max-w-full px-8">
		<form>
			<div class="flex flex-col gap-4">
				<div class="flex flex-row gap-4 justify-between">
					<select class="sel-primary w-16" bind:value={setId}>
						{#each definitionSets as set, i}
							<option value="{set}">{set}</option>
						{/each}
					</select>
					<input class="inp-primary w-28" 
					bind:value={maxScore}
					use:validator={maxScore}
					type="number" 
					id="maxScoreInput"
					min="0" 
					max="1000" 
					step="1">
					<div></div>
				</div>
				<div class="flex flex-row gap-4 justify-between">
					<button class="btn-primary flex-1">1</button>
					<button class="btn-primary flex-1">1/2</button>
					<button class="btn-primary flex-1">1/3</button>
					<button class="btn-primary flex-1">1/4</button>
				</div>
			</div>
		</form>
	</div>
    <div class="text-xl">© ovid 2023</div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
