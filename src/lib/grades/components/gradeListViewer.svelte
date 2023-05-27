<script>
    import GradeFactory from "$lib/grades/gradeFactory";
    import GradeViewer from "$lib/grades/components/gradeViewer.svelte";
    export let maxPoints = 100;
    export let setId = "US";
    export let fraction = 1;
    export let factory = new GradeFactory();
    $: grades = factory.generate({
        max: maxPoints,
        setId: setId,
        fraction: fraction,
    });
</script>

<div
    id="grade-list"
    class="w-[40rem] max-w-full grow overflow-auto flex flex-col gap-4 p-2"
>
    <GradeViewer {grades} />
</div>
