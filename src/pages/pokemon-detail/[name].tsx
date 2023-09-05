import React from "react"
import Image from "next/image"
import Layout from "@/components/layout/layout"
import Link from "next/link"
import { PokemonBase } from "@/domain/pokemon/pokemon.types"

interface Props {
  pokemon: PokemonBase
}

const PokemonDetail = ({ pokemon }: Props) => {
  const POKEMON_INDEX = ("000" + pokemon.id).slice(-3)

  const showPokemonData = () =>
    pokemon.stats.map((stat, index) => (
      <div key={index} className="my-2 rounded p-1">
        <div className="rounded px-2" style={{ width: `${stat.base}%` }}>
          {stat.name}: {stat.base}
        </div>
      </div>
    ))

  return (
    <Layout title={pokemon.name}>
      <div>
        <Link className="pb-10 font-medium" href="/">
          Back
        </Link>
      </div>
      <div className="p-10 bg-cyan-950">
        <div className="flex flex-col justify-center items-center">
          <h2>{pokemon.name}</h2>
          <Image
            width={200}
            height={200}
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${POKEMON_INDEX}.png`}
            alt={pokemon.name}
          />
        </div>
        <div className="w-6/12 m-auto">
          <div>{showPokemonData()}</div>
        </div>
      </div>
    </Layout>
  )
}

export default PokemonDetail

export async function getServerSideProps(context) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
  )
  const pokemon = await response.json()

  const pokemonData = {
    id: pokemon.id,
    name: pokemon.name,
    stats: pokemon.stats.map((statInfo) => {
      return {
        base: statInfo.base_stat,
        name: statInfo.stat.name,
      }
    }),
  }

  return {
    props: {
      pokemon: pokemonData,
    },
  }
}
