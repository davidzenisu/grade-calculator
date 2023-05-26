<script>
    import mainPages from "$lib/menu/mainPages";
    export let hide = false;
</script>

{#if !hide}
    <nav class="text-lg md:text-xl flex flex-row gap-4">
        {#each mainPages as mainPage}
            <a
                class="lnk-primary"
                class:underline={mainPage.isCurrentPage()}
                href={mainPage.path}>{mainPage.name}</a
            >
        {/each}
    </nav>
{/if}
