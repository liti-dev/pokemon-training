import type { Pokemon, PokemonTrainerOptions, TrainingPhase } from './PokemonTrainerOptions'

const TRAINING_DURATION = 5000
const EXPERIENCE_RATE = 10 // exp per sec

export class PokemonTrainerState {
	pokemon: Pokemon

	#phase = $state<TrainingPhase>('idle')
	#elapsed = $state(0)

	// Constructor passes options
	constructor(options: () => PokemonTrainerOptions) {
		this.pokemon = $derived(options().initialPokemon!)
	}

	// Derived values
	experienceGained = $derived(
		this.#phase === 'training' ? Math.floor(this.#elapsed / 1000) * EXPERIENCE_RATE : 0
	)
	progress = $derived(
		this.#phase === 'training' ? Math.min((this.#elapsed / TRAINING_DURATION) * 100, 100) : 0
	)
	elapsedSeconds = $derived(Math.floor(this.#elapsed / 1000))

	get phase() {
		return this.#phase
	}

	get elapsed() {
		return this.#elapsed
	}

	// Methods to transition state
	startTraining() {
		if (this.#phase === 'idle') {
			this.#phase = 'training'
			this.#elapsed = 0
		}
	}

	stopTraining() {
		if (this.#phase === 'training') {
			this.pokemon.experience += this.experienceGained
			this.#phase = 'idle'
			this.#elapsed = 0
		}
	}

	tick(deltaMs: number) {
		if (this.#phase === 'training') {
			this.#elapsed += deltaMs
			if (this.#elapsed >= TRAINING_DURATION) {
				this.#phase = 'evolved'
			}
		}
	}

	evolve() {
		if (this.#phase === 'evolved') {
			this.pokemon.level += 1
			this.pokemon.experience = 0
			this.#phase = 'idle'
			this.#elapsed = 0
		}
	}

	reset() {
		this.#phase = 'idle'
		this.#elapsed = 0
		this.pokemon.experience = 0
		this.pokemon.level = 1
	}
}
