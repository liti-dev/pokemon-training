<script lang="ts">
	import type { Pokemon, TrainingPhase } from '$lib/types'

	interface Props {
		pokemon: Pokemon
		phase: TrainingPhase
	}

	let { pokemon, phase }: Props = $props()
</script>

<div class="pokemon-card">
	<h2>{pokemon.name}</h2>
	<div class="stats">
		<p><strong>Level:</strong> {pokemon.level}</p>
		<p><strong>Experience:</strong> {pokemon.experience}</p>
		<p><strong>Phase:</strong> {phase}</p>
	</div>
</div>

<style>
	.pokemon-card {
		border: 2px solid #ddd;
		border-radius: 8px;
		padding: 1.5rem;
		margin: 1rem 0;
		background: #f9f9f9;
	}

	.pokemon-card h2 {
		margin: 0 0 1rem 0;
		color: #ff6b00;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stats p {
		margin: 0;
		font-size: 0.95rem;
	}
</style>
