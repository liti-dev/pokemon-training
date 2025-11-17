import { getContext, setContext, hasContext } from 'svelte'
import type { PokemonTrainerOptions } from './PokemonTrainerOptions'
import { pokemonTrainerDefaults } from './PokemonTrainerOptions'
import { PokemonTrainerState } from './pokemonTrainerState.svelte'

// private! only the hook can access it
const key = Symbol('pokemon-trainer-context')

export const usePokemonTrainer = (
	options: () => PokemonTrainerOptions = () => pokemonTrainerDefaults
) => {
	// override with provided options
	const opts = $derived.by(() => ({
		...pokemonTrainerDefaults,
		...options()
	}))

	// state retrieved or created
	let state: PokemonTrainerState
	if (hasContext(key)) {
		state = getContext<PokemonTrainerState>(key)
	} else {
		state = new PokemonTrainerState(() => opts)
		setContext(key, state)
	}

	// simulate real-time training
	$effect(() => {
		if (state.phase === 'training') {
			const interval = setInterval(() => {
				state.tick(1000)
			}, 1000)

			// cleanup when training stops or component unmounts
			return () => clearInterval(interval)
		}
	})

	// save whenever pokemon data changes
	$effect(() => {
		state.savePokemonData()
	})

	return state
}
