<script lang="ts">
	import { usePokemonTrainer } from '$lib/pokemonTrainer/usePokemonTrainer.svelte.ts'
	import PokemonCard from '$lib/components/PokemonCard.svelte'

	let trainer = usePokemonTrainer()
</script>

<div class="container">
	<h1>Pokémon Training</h1>

	<div class="pokemon-selection">
		<h2>Choose Your Pokémon</h2>
		<div class="pokemon-grid">
			{#each trainer.availablePokemons as pokemon}
				<button
					class="pokemon-card {trainer.pokemon?.name === pokemon.name ? 'selected' : ''}"
					onclick={() => trainer.selectPokemonByName(pokemon.name)}
				>
					<h3>{pokemon.name}</h3>
					<p>Level: {pokemon.level}</p>
					<p>Exp: {pokemon.experience}</p>
				</button>
			{/each}
		</div>
	</div>

	{#if trainer.pokemon}
		<!-- Training Area -->
		<div class="training-area">
			<h2>Training: {trainer.pokemon.name}</h2>

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
	{/if}
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

	.pokemon-selection {
		margin-bottom: 2rem;
	}

	.pokemon-selection h2 {
		text-align: center;
		color: #333;
		margin-bottom: 1rem;
	}

	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.pokemon-card {
		padding: 1.5rem;
		border: 2px solid #ddd;
		border-radius: 8px;
		background: #f9f9f9;
		cursor: pointer;
		transition: all 0.2s;
		text-align: center;
		font-family: inherit;
		font-size: inherit;
		width: 100%;
	}

	.pokemon-card:hover {
		border-color: #ff6b00;
		background: #fff;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.pokemon-card.selected {
		border-color: #ff6b00;
		background: #fff5f0;
		box-shadow: 0 2px 8px rgba(255, 107, 0, 0.2);
	}

	.pokemon-card h3 {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.2rem;
	}

	.pokemon-card p {
		margin: 0.25rem 0;
		color: #666;
		font-size: 0.9rem;
	}

	.training-area {
		border-top: 2px solid #eee;
		padding-top: 2rem;
	}

	.training-area h2 {
		text-align: center;
		color: #333;
		margin-bottom: 1rem;
	}
</style>
