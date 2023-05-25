<script>
    import {marked} from 'marked';
    export let content = 'No **content** to show!';
    marked.setOptions({mangled: false, headerIds: false});
</script>
<div class="flex flex-col gap-4">
    {@html marked.parse(content)}
</div>