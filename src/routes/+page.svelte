<script lang="ts">
	import { usePokemonTrainer } from '$lib/pokemonTrainer/usePokemonTrainer.svelte.ts'
	import PokemonCard from '$lib/components/PokemonCard.svelte'

	let trainer = usePokemonTrainer()
</script>

<div class="container">
	<h1>Pokémon Training</h1>

	<PokemonCard pokemon={trainer.pokemon} phase={trainer.phase} />

	<div class="progress-bar">
		<div class="fill" style="width: {trainer.progress}%"></div>
	</div>

	<div class="display">
		<p>Elapsed: {trainer.elapsedSeconds}s</p>
		<p>Exp Gained: {trainer.experienceGained}</p>
	</div>

	<div class="controls">
		{#if trainer.phase === 'idle'}
			<button onclick={() => trainer.startTraining()}>Start Training</button>
		{:else if trainer.phase === 'evolved'}
			<button onclick={() => trainer.evolve()}>Evolve!</button>
		{/if}

		<button onclick={() => trainer.reset()} class="secondary">Reset</button>
	</div>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 2rem auto;
		padding: 2rem;
		font-family: sans-serif;
	}

	h1 {
		text-align: center;
		color: #333;
	}

	.progress-bar {
		width: 100%;
		height: 24px;
		background: #e0e0e0;
		border-radius: 4px;
		overflow: hidden;
		margin: 1.5rem 0;
	}

	.fill {
		height: 100%;
		background: linear-gradient(90deg, #4caf50, #8bc34a);
		transition: width 0.1s linear;
	}

	.display {
		text-align: center;
		padding: 1rem;
		background: #f0f0f0;
		border-radius: 4px;
		margin: 1rem 0;
	}

	.display p {
		margin: 0.25rem 0;
		font-size: 0.9rem;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		margin-top: 2rem;
	}

	button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		border: none;
		border-radius: 4px;
		background: #ff6b00;
		color: white;
		cursor: pointer;
		transition: background 0.2s;
	}

	button:hover {
		background: #e55a00;
	}

	button.secondary {
		background: #999;
	}

	button.secondary:hover {
		background: #777;
	}
</style>
