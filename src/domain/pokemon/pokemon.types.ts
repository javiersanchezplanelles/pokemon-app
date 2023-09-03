export interface Pokemon {
  name: string
  url: string
  types: PokemonType[]
}

export interface PokemonType {
  slot: number
  name: string
}
