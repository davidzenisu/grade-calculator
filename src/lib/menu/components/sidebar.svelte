<script>
	import { fly } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";
	import mainPages from "../mainPages";
	import { page } from "$app/stores";
	export let open = false;
</script>

{#if open}
	<aside
		class="absolute z-5 w-full h-full bg-slate-600 bg-opacity-95 shadow-lg"
		transition:fly={{ x: -100, easing: cubicInOut }}
	>
		<nav class="p-8 pt-16 text-2xl flex flex-col gap-4">
			{#each mainPages as mainPage}
				<a
					class="lnk-primary"
					class:underline={mainPage.isCurrentPage()}
					href={mainPage.path}>{mainPage.name}</a
				>
			{/each}
		</nav>
	</aside>
{/if}
