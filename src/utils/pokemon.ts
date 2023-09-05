import { PokemonBase } from "@/domain/pokemon/pokemon.types"

export const capitalizePokemonName = (pokemonName: string) =>
  `${pokemonName.charAt(0).toUpperCase()}${pokemonName.slice(1)}`

export const getPokemonIndex = (pokemonId: number) =>
  ("000" + pokemonId).slice(-3)
