<script>
    import GradeFactory from "$lib/gradeFactory";
    import GradeViewer from "./gradeViewer.svelte";

	export let maxPoints = 100;
    export let preset = 'AT';
    const gradeFactory = new GradeFactory(preset);
    $: grades = gradeFactory.generate({ max: maxPoints });
</script>

<GradeViewer grades={grades}></GradeViewer>