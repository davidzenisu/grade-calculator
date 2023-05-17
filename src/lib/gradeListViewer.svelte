<script>
    import GradeFactory from "$lib/gradeFactory";
    import GradeViewer from "./gradeViewer.svelte";

	export let maxPoints = 100;
    export let preset = 'AT';
    const gradeFactory = new GradeFactory(preset);
    $: grades = gradeFactory.generate({ max: maxPoints });
</script>

<div class="grow overflow-auto flex flex-col gap-4 text-2xl xl:text-4xl md:text-3xl p-2">
<!-- <div class="text-xl gap-3 grid grid-flow-row-dense overflow-auto grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2"> -->
    <GradeViewer grades={grades}></GradeViewer>
</div>