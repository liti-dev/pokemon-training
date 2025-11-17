export type TrainingPhase = 'idle' | 'training' | 'evolved'

export interface Pokemon {
	name: string
	level: number
	experience: number
}

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
