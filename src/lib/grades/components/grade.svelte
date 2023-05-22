<script>
    /** @type {import('$lib/grades/gradeFactory').Grade}*/
	export let grade;
    export let indent = 0;
</script>


<div class="flex flex-row px-{indent} gap-8 justify-between">
    <div>{grade.label}:</div>
   <div>{grade.display}</div>
</div>