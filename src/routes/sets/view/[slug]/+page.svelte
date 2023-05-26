<script>
    import GradeSetPreview from "$lib/grades/components/sets/gradeSetPreview.svelte";
    export let data;
</script>

<div
    class="text-2xl flex-1 flex flex-col overflow-auto max-w-full gap-3 min-w-[15rem]"
>
    <GradeSetPreview presetId={data.slug} />
</div>
