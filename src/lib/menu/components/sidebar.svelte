<script>
	export let open = false
</script>

<aside class="absolute w-full h-full bg-gray-200 border-r-2 shadow-lg" class:open>
	<nav class="p-12 text-xl">
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