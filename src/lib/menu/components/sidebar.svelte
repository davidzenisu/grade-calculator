<script>
	export let open = false
</script>

<aside class="absolute w-full h-full bg-slate-600 bg-opacity-95 shadow-lg" class:open>
	<nav class="p-8 pt-16 text-2xl flex flex-col gap-4">
		<a class="block hover:text-slate-800" href="/">Home</a>
		<a class="block hover:text-slate-800" href="#settings">Settings</a>
		<a class="block hover:text-slate-800" href="#policy">Private Policy</a>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out
	}
	
	.open {
		left: 0
	}
</style>