export type TrainingPhase = 'idle' | 'training' | 'evolved'

export interface Pokemon {
	name: string
	level: number
	experience: number
}
