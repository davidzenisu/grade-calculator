<script>
  import Sidebar from "$lib/menu/components/sidebar.svelte";
  import Navbar from "$lib/menu/components/navbar.svelte";
  import "../app.css";
  import { navigating, page } from "$app/stores";
  import LoadingScreen from "$lib/menu/components/loadingScreen.svelte";
  import { fly } from "svelte/transition";

  let open = false;
  /**
   * @type {string | null}
   */
  let currentPage;

  navigating.subscribe((currentlyNavigating) => {
    if (currentlyNavigating) {
      return;
    }
    // always close navbar if navigator changes to null!
    open = false;
  });

  page.subscribe((page) => {
    currentPage = page.route.id;
  });
</script>

{#if $navigating}
  <LoadingScreen />
{/if}
<div id="main-view" class="min-h-[100dvh] max-h-screen flex flex-col">
  <Sidebar bind:open />
  <Navbar bind:sidebar={open} />
  <div
    id="content-view"
    class="flex-1 overflow-auto flex flex-col items-center justify-between p-6 gap-4"
  >
    {#key currentPage}
      <div
        class="flex-1 flex flex-col overflow-auto max-w-full text-2xl xl:text-4xl md:text-3xl p-2"
        in:fly={{ y: -50, duration: 500, delay: 100 }}
      >
        <slot />
      </div>
    {/key}

    <div class="text-xl">© ovid 2023</div>
  </div>
</div>
