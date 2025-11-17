import type { PokemonTrainerOptions } from './PokemonTrainerOptions'

import type { Pokemon, TrainingPhase } from '$lib/types'

const TRAINING_DURATION = 5000
const EXPERIENCE_RATE = 10 // exp per sec
const STORAGE_KEY = 'pokemon-trainer-data'

export class PokemonTrainerState {
	#selectedPokemon = $state<Pokemon | null>(null)
	#availablePokemons = $state<Pokemon[]>([])
	#options: () => PokemonTrainerOptions

	#phase = $state<TrainingPhase>('idle')
	#elapsed = $state(0)

	// Constructor passes options
	constructor(options: () => PokemonTrainerOptions) {
		this.#options = options
		this.#loadPokemonData()
	}

	get pokemon() {
		return this.#selectedPokemon
	}

	get availablePokemons() {
		return this.#availablePokemons
	}

	selectPokemon(pokemon: Pokemon) {
		if (this.#phase === 'idle') {
			this.#selectedPokemon = pokemon
			// Reset training state when switching Pokemon
			this.#elapsed = 0
		}
	}

	selectPokemonByName(name: string) {
		const pokemon = this.#availablePokemons.find((p) => p.name === name)
		if (pokemon) {
			this.selectPokemon(pokemon)
		}
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
		if (this.#phase === 'training' && this.#selectedPokemon) {
			this.#selectedPokemon.experience += this.experienceGained
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
		if (this.#phase === 'evolved' && this.#selectedPokemon) {
			this.#selectedPokemon.level += 1
			this.#selectedPokemon.experience = 0
			this.#phase = 'idle'
			this.#elapsed = 0
		}
	}

	reset() {
		this.#phase = 'idle'
		this.#elapsed = 0
		if (this.#selectedPokemon) {
			this.#selectedPokemon.experience = 0
			this.#selectedPokemon.level = 1
		}
	}

	// Load Pokemon data from localStorage
	#loadPokemonData() {
		const opts = this.#options()

		if (opts.enablePersistence && typeof localStorage !== 'undefined') {
			try {
				const saved = localStorage.getItem(STORAGE_KEY)
				if (saved) {
					this.#availablePokemons = JSON.parse(saved)
					this.#selectedPokemon = this.#availablePokemons[0]
					return
				}
			} catch (error) {
				console.warn('Failed to load Pokemon data:', error)
			}
		}

		// Use options (already merged with defaults)
		this.#availablePokemons = [...opts.availablePokemons!]
		this.#selectedPokemon = opts.initialPokemon!
	}

	// Save Pokemon data to localStorage
	savePokemonData() {
		const opts = this.#options()

		if (opts.enablePersistence && typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#availablePokemons))
			} catch (error) {
				console.warn('Failed to save Pokemon data:', error)
			}
		}
	}
}
