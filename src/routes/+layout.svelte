<script>
    import Sidebar from "$lib/menu/components/sidebar.svelte";
    import Navbar from "$lib/menu/components/navbar.svelte";
  import "../app.css";

  let open = false;
</script>

<div id="main-view" class="min-h-[100dvh] max-h-screen flex flex-col">
  <Sidebar bind:open/>
  <Navbar bind:sidebar={open}/>
  <div id="content-view" class="flex-1 overflow-auto flex flex-col items-center justify-between p-6 gap-4">
    <slot />
    <div class="text-xl">© ovid 2023</div>
  </div>
</div>