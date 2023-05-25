<script>
    import Sidebar from "$lib/menu/components/sidebar.svelte";
    import Navbar from "$lib/menu/components/navbar.svelte";
  import "../app.css";

  let open = false;
</script>

<div class="flex min-h-[100dvh] max-h-screen flex-col items-center justify-between p-6 gap-4">
  <Sidebar bind:open/>
  <Navbar bind:sidebar={open}/>
  <slot />
  <div class="text-xl">© ovid 2023</div>
</div>