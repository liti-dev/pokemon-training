import type { Pokemon } from '$lib/types'

export interface PokemonTrainerOptions {
	initialPokemon?: Pokemon
	availablePokemons?: Pokemon[]
	enablePersistence?: boolean
}

export const pokemonTrainerDefaults: PokemonTrainerOptions = {
	initialPokemon: {
		name: 'Pikachu',
		level: 1,
		experience: 0
	},
	availablePokemons: [
		{ name: 'Pikachu', level: 1, experience: 0 },
		{ name: 'Charmander', level: 1, experience: 0 },
		{ name: 'Squirtle', level: 1, experience: 0 }
	],
	enablePersistence: true
}
