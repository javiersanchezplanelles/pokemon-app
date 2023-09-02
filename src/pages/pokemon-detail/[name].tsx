import React from "react"
import Image from "next/image"
import Layout from "@/components/layout/layout"
import Link from "next/link"

const PokemonDetail = ({ pokemon }) => {
  const pokemonIndex = ("000" + pokemon.id).slice(-3)

  const showPokemonTypes = () =>
    pokemon.types.map((type) => (
      <li key={type.slot} className="px-2 py-1 bg-cyan-700 rounded">
        {type.type.name}
      </li>
    ))

  const showPokemonData = () =>
    pokemon.stats.map((stat, index) => (
      <div key={index} className="my-2 rounded p-1">
        <div className="rounded px-2" style={{ width: `${stat.base_stat}%` }}>
          {stat.stat.name}: {stat.base_stat}
        </div>
      </div>
    ))

  return (
    <Layout title={pokemon.name}>
      <div>
        <Link href="/">Back</Link>
      </div>
      <div className="p-10 bg-cyan-950">
        <div className="flex flex-col justify-center items-center">
          <h2>{pokemon.name}</h2>
          <Image
            width={200}
            height={200}
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonIndex}.png`}
            alt={pokemon.name}
          />
        </div>
        <div className="bg-slate-900 w-6/12 m-auto">
          <ul className="flex gap-5">{showPokemonTypes()}</ul>

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
  return {
    props: {
      pokemon,
    },
  }
}
