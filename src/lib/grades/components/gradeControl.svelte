<script>
    import GradeListViewer from '$lib/grades/components/gradeListViewer.svelte';
    import GradeFactory from '$lib/grades/gradeFactory';
    import { gradeSetStore, maxScoreStore, fractionStore } from '../gradeLocalStores';

    const maxFraction = 2;
	let lastValue = $maxScoreStore;

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
		const newScore = $maxScoreStore > parseInt(node.max) || $maxScoreStore < parseInt(node.min) ? lastValue : value;
		lastValue = newScore;
        $maxScoreStore = newScore;
      }
    }
  }
</script>

<div class="flex flex-1 h-full flex-col max-w-full justify-between items-center">
    <GradeListViewer factory={gradeFactory} maxPoints={$maxScoreStore || 0} setId={$gradeSetStore} fraction={$fractionStore} ></GradeListViewer>
    <div class="w-[28rem] max-w-full px-8">
        <form>
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4 justify-center">
                    <select class="sel-primary w-16" bind:value={$gradeSetStore}>
                        {#each definitionSets as set}
                            <option value="{set}" selected="{$gradeSetStore===set}">{set}</option>
                        {/each}
                    </select>
                    <input class="inp-primary w-28" 
                    bind:value={$maxScoreStore}
                    use:validator={$maxScoreStore}
                    type="number" 
                    id="maxScoreInput"
                    min="0" 
                    max="1000" 
                    step="1">
                    <div class="w-16"></div>
                </div>
                <div class="flex flex-row gap-8 justify-center">
                    {#each Array.from({ length: maxFraction}, (_, i) => i+1) as number}
                    <div class="w-16">
                        <input class="hidden peer" type="radio" id="{`fraction-${number}`}" name="fraction" value={number} bind:group={$fractionStore} />
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
