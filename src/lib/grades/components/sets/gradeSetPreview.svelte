<script>
    import { GetGradePresets } from "$lib/grades/presets/gradePresets.js";
    import GradeDefViewer from "./gradeDefViewer.svelte";

    /**
     * @type {string}
     */
    export let presetId;
    const preset = GetGradePresets().find((p) => p.id === presetId);
    /** @type {string[]} */
</script>

{#if preset}
    <div class="text-center">{preset?.label}</div>
    <GradeDefViewer gradeDefs={preset?.grades} />
{:else}
    <div>No grade set available for id {presetId}</div>
{/if}
