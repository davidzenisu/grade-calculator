<script>
  import LoadingSpinner from "./loadingSpinner.svelte";
</script>

<div
  id="overlay"
  class="fixed z-10 w-full h-full flex flex-col items-center justify-center"
>
  <div class="w-24 h-24">
    <LoadingSpinner />
  </div>
</div>
