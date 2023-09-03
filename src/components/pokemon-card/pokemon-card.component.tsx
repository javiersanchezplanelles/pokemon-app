import React from "react"
import Image from "next/image"
import Link from "next/link"
import { PokemonCard } from "../../domain/pokemon/pokemon-card.types"
import { PokemonType } from "@/domain/pokemon/pokemon.types"

export const PokemonCardComponent = ({ pokemon, index }: PokemonCard) => {
  const pokemonIndex = ("000" + (index + 1)).slice(-3)
  const renderTypes = () => {
    return pokemon.types.map((typeInfo: PokemonType) => (
      <li key={`${pokemonIndex}-${typeInfo.name}`}>{typeInfo.name}</li>
    ))
  }

  return (
    <Link href={`/pokemon-detail/${pokemon.name}`}>
      <div className="bg-cyan-950 rounded m-5 p-5 flex flex-col justify-center item-center">
        <Image
          width={200}
          height={200}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonIndex}.png`}
          alt={pokemon.name}
        />
        <div className="text-center">{pokemon.name}</div>
        <div>
          <ul className="bg-cyan-800 p-1 rounded">{renderTypes()}</ul>
        </div>
        <div className="mt-5 text-center font-bold italic">
          <p>#{pokemonIndex}</p>
        </div>
      </div>
    </Link>
  )
}
