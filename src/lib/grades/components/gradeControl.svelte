<script>
    import { enhance } from "$app/forms";
    import GradeListViewer from "$lib/grades/components/gradeListViewer.svelte";
    import GradeFactory from "$lib/grades/gradeFactory";
    import {
        gradeSetStore,
        maxScoreStore,
        fractionStore,
        hideLabelStore,
    } from "../gradeLocalStores";

    const maxFraction = 2;
    let lastValue = $maxScoreStore;

    const gradeFactory = new GradeFactory();
    const definitionSets = gradeFactory.getGradeDefinitions().map((c) => c.id);

    const hiddenLabels = $hideLabelStore ? "hidden" : "";

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
                const newScore =
                    $maxScoreStore > parseInt(node.max) ||
                    $maxScoreStore < parseInt(node.min)
                        ? lastValue
                        : value;
                lastValue = newScore;
                $maxScoreStore = newScore;
            },
        };
    }
</script>

<div
    id="grade-wrapper"
    class="flex flex-1 h-full max-h-screen overflow-auto flex-col max-w-full justify-between items-center gap-4"
>
    <GradeListViewer
        factory={gradeFactory}
        maxPoints={$maxScoreStore || 0}
        setId={$gradeSetStore}
        fraction={$fractionStore}
    />
    <div id="grade-input" class="w-[28rem] max-w-full px-8 sm:px-0">
        <form
            method="POST"
            action="?/calculate"
            use:enhance={({ cancel }) => {
                cancel();
            }}
        >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                <fieldset class="flex flex-col justify-center">
                    <legend
                        class="mx-auto pb-2 {hiddenLabels} text-lg xl:text-2xl md:text-xl"
                        >Score Settings:</legend
                    >
                    <div class="flex flex-row gap-4 justify-center">
                        <div class="flex flex-col items-center gap-2">
                            <label
                                class="{hiddenLabels} text-md xl:text-xl md:text-lg"
                                for="maxScoreInput">Mode:</label
                            >
                            <select
                                class="sel-primary w-16"
                                bind:value={$gradeSetStore}
                                name="gradeSet"
                            >
                                {#each definitionSets as set}
                                    <option
                                        value={set}
                                        selected={$gradeSetStore === set}
                                        >{set}</option
                                    >
                                {/each}
                            </select>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <label
                                class="{hiddenLabels} text-md xl:text-xl md:text-lg"
                                for="maxScoreInput"
                            >
                                Max. Score:</label
                            >
                            <input
                                class="inp-primary w-28"
                                bind:value={$maxScoreStore}
                                use:validator={$maxScoreStore}
                                type="number"
                                id="maxScoreInput"
                                name="maxScore"
                                min="0"
                                max="1000"
                                step="1"
                            />
                        </div>
                        <div class="w-16 sm:hidden" />
                    </div>
                </fieldset>
                <fieldset class="flex flex-col justify-center">
                    <div>
                        <legend
                            class="mx-auto text-lg xl:text-2xl md:text-xl pb-2 text-center {hiddenLabels}"
                            >Score Breaks:</legend
                        >
                    </div>
                    <div class="flex flex-row gap-4 justify-center">
                        {#each Array.from({ length: maxFraction }, (_, i) => i + 1) as number}
                            <div class="w-16">
                                <input
                                    class="hidden peer"
                                    type="radio"
                                    id={`fraction-${number}`}
                                    name="fraction"
                                    value={number}
                                    bind:group={$fractionStore}
                                />
                                <label
                                    class="rad-primary flex h-full w-full"
                                    for={`fraction-${number}`}
                                >
                                    1{number > 1 ? `/${number}` : ""}
                                </label>
                            </div>
                        {/each}
                    </div>
                </fieldset>
                <noscript>
                    <button class="btn-primary">Calculate</button>
                </noscript>
            </div>
        </form>
    </div>
</div>
