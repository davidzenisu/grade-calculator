<script>
    /** @type {import('$lib/grades/gradeFactory').GradeDefinition}*/
    export let gradeDef;
    export let indent = 0;
</script>

<div id="grade-detail" class="flex flex-row px-{indent} gap-8 justify-between">
    <div>{gradeDef.label}:</div>
    <div>{`<= ${gradeDef.base} %`}</div>
</div>
<hr class="mx-{indent}" class:border-dashed={gradeDef.children} />
