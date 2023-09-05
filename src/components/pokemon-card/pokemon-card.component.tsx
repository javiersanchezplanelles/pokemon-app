import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Pokemon, PokemonType } from "../../domain/pokemon/pokemon.types"
import {
  capitalizePokemonName,
  getPokemonColorType,
  getPokemonIndex,
} from "../../utils/pokemon"

interface Props {
  pokemon: Pokemon
}

export const PokemonCardComponent = ({ pokemon }: Props) => {
  const POKEMON_INDEX = getPokemonIndex(pokemon && pokemon.id)

  const showPokemonTypes = () => {
    return pokemon.types.map((typeInfo: PokemonType) => (
      <li
        className={`${getPokemonColorType(
          typeInfo.name
        )} flex items-center justify-center`}
        key={`${pokemon.id}${typeInfo.name}`}
      >
        {typeInfo.name}
      </li>
    ))
  }

  return (
    <Link href={`/pokemon-detail/${pokemon.name}`}>
      <div className="bg-cyan-950 rounded m-5 p-5 flex flex-col justify-center item-center">
        <Image
          width={200}
          height={200}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${POKEMON_INDEX}.png`}
          alt={pokemon.name}
        />
        <div className="text-center">{capitalizePokemonName(pokemon.name)}</div>
        <div>
          <ul className="bg-cyan-800 p-1 rounded">{showPokemonTypes()}</ul>
        </div>
        <div className="mt-5 text-center font-bold italic">
          <p>#{POKEMON_INDEX}</p>
        </div>
      </div>
    </Link>
  )
}
