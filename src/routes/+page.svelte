<script>
	import GradeViewer from '$lib/gradeViewer.svelte';
</script>

<div class="flex min-h-screen flex-col items-center justify-between p-8 gap-4">
    <h1 class="text-3xl">Hello world!</h1>
    <div><GradeViewer></GradeViewer></div>
    <div class="text-3xl">Footer lol</div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
