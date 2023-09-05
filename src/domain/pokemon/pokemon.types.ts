export interface Pokemon {
  id: number
  name: string
  url: string
  types: PokemonType[]
}

export type PokemonBase = Omit<Pokemon, "url"> & {
  stats: PokemonStats[]
}

export interface PokemonStats {
  name: string
  base: number
}

export interface PokemonType {
  slot: number
  name: string
}

export interface PokemonTypeInfo {
  name: string
  color: string
}

export const PokemonTypesList: PokemonTypeInfo[] = [
  { name: "Choose type", color: "bg-stone-700" },
  { name: "fire", color: "bg-red-600" },
  { name: "water", color: "bg-blue-600" },
  { name: "grass", color: "bg-green-300" },
  { name: "ice", color: "bg-blue-100" },
  { name: "psychic", color: "bg-fuchsia-700" },
  { name: "flying", color: "bg-blue-200" },
  { name: "dark", color: "bg-black" },
  { name: "steel", color: "bg-gray-200" },
  { name: "normal", color: "bg-slate-500" },
  { name: "electric", color: "bg-yellow-300" },
  { name: "fighting", color: "bg-orange-400" },
  { name: "poison", color: "bg-fuchsia-600" },
  { name: "ground", color: "bg-yellow-500" },
  { name: "bug", color: "bg-green-700" },
  { name: "rock", color: "bg-brown" },
  { name: "ghost", color: "bg-fuchsia-200" },
  { name: "dragon", color: "bg-fuchsia-300" },
]
