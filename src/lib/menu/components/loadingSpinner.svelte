<script lang="ts">
	export let blocks = 5;
	export let flow = 1;
	export let color = "#4c0519";
	export let duration = 1200;
	export let pause = false;
	const durationUnit = "ms";
	const fullDuration = `${duration}${durationUnit}`;
</script>

<div
	class="w-full h-full inline-block flex flex-row"
	style="--color: {color}; --fullDuration: {fullDuration}"
>
	{#each [...Array(blocks).keys()].map((i) => i + 1) as version}
		<div
			class="rect grow-[3]"
			class:pause-animation={pause}
			style="animation-delay: {(version - 1) *
				(+duration / (12 * flow))}{durationUnit}"
		/>
		{#if version !== blocks}
			<div class="grow" />
		{/if}
	{/each}
</div>

<style>
	.rect {
		height: 100%;
		display: inline-block;
		transform: scaleY(0.4);
		flex-grow: 3;
		background-color: var(--color);
		animation: stretch var(--fullDuration) ease-in-out infinite;
	}
	.pause-animation {
		animation-play-state: paused;
	}
	@keyframes stretch {
		0%,
		40%,
		100% {
			transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1);
		}
	}
</style>
