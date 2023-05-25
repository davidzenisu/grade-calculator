<script>
    import { fly } from "svelte/transition";
    import { enhance } from "$app/forms";
    import { GetGradePresets } from "$lib/grades/presets/gradePresets.js";
    import { page } from "$app/stores";
    const presets = GetGradePresets();
    /** @type {string[]} */
    let deleting = [];
</script>

<div class="flex flex-1 flex-col gap-8 overflow-auto justify-between">
    <h1>Grade Presets</h1>
    <div
        class="flex-1 presets flex flex-col items-center gap-4 w-full text-xl overflow-auto"
    >
        {#each presets.filter((p) => !deleting.includes(p.id)) as preset (preset.id)}
            <form
                transition:fly|local={{ y: 20 }}
                method="POST"
                action="?/delete"
                use:enhance={({ cancel }) => {
                    deleting = [...deleting, preset.id];
                    // always cancelling for now!
                    cancel();
                }}
            >
                <input type="hidden" name="id" value={preset.id} />
                <span>{preset.label}</span>
                <button aria-label="Mark as complete">X</button>
            </form>
        {/each}
    </div>
    <a class="btn-primary" href="{$page.url.pathname}/wizard">Create Set</a>
</div>
