<script>
    import GradeFactory from "$lib/gradeFactory";
    import GradeViewer from "./gradeViewer.svelte";

	export let maxPoints = 100;
    export let preset = 'AT';
    const gradeFactory = new GradeFactory(preset);
    $: grades = gradeFactory.generate({ max: maxPoints });
</script>

<div class="grow text-4xl overflow-auto flex flex-col gap-3">
    <GradeViewer grades={grades}></GradeViewer>
</div>