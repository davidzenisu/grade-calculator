<script>
    import GradeListViewer from '$lib/grades/gradeListViewer.svelte';
    import GradeFactory from '$lib/grades/gradeFactory';

    let maxScore = 100;
    let setId = 'AT';
    let fraction = 1;

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

<div class="flex flex-1 h-full flex-col max-w-full justify-between">
    <GradeListViewer factory={gradeFactory} maxPoints={maxScore || 0} setId={setId} ></GradeListViewer>
    <div class="w-[28rem] max-w-full px-8">
        <form>
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4 justify-center">
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
                    <div class="w-16"></div>
                </div>
                <div class="flex flex-row gap-4 justify-between">
                    {#each [1, 2, 3, 4] as number}
                    <div class="w-16">
                        <input class="hidden peer" type="radio" id="{`fraction-${number}`}" name="fraction" value={number} bind:group={fraction} />
                        <label class="rad-primary flex h-full w-full" for="{`fraction-${number}`}">
                            1{number > 1? `/${number}` : ""}
                        </label>
                    </div>
                    {/each}
                </div>
            </div>
        </form>
    </div>
</div>
