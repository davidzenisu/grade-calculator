<script>
	import { fly } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";
	export let open = false;
</script>

{#if open}
	<aside
		class="absolute z-5 w-full h-full bg-slate-600 bg-opacity-95 shadow-lg"
		transition:fly={{ x: -100, easing: cubicInOut }}
	>
		<nav class="p-8 pt-16 text-2xl flex flex-col gap-4">
			<a class="lnk-primary" href="/">Home</a>
			<a class="lnk-primary" href="/settings">Settings</a>
			<a class="lnk-primary" href="/policy">Private Policy</a>
		</nav>
	</aside>
{/if}
