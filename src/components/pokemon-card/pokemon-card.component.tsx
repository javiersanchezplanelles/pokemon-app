import React from "react"
import Image from "next/image"

export const PokemonCard = ({ pokemon, index }) => {
  const pokemonIndex = ("000" + (index + 1)).slice(-3)

  return (
    <div className="bg-cyan-950 rounded m-5 p-5 flex flex-col justify-center item-center">
      <Image
        width={200}
        height={200}
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonIndex}.png`}
        alt={pokemon.name}
      ></Image>
      <div className="text-center">{pokemon.name}</div>
    </div>
  )
}
