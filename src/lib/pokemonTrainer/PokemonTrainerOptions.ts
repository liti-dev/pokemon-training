import type { Pokemon } from '$lib/types'

export interface PokemonTrainerOptions {
	initialPokemon?: Pokemon
}

export const pokemonTrainerDefaults: PokemonTrainerOptions = {
	initialPokemon: {
		name: 'Pikachu',
		level: 1,
		experience: 0
	}
}
