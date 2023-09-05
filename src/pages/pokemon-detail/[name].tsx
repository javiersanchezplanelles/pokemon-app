import React, { useState } from "react"
import Image from "next/image"
import Layout from "@/components/layout/layout"
import Link from "next/link"
import { PokemonBase } from "@/domain/pokemon/pokemon.types"
import {
  capitalizePokemonName,
  getPokemonColorType,
  getPokemonIndex,
} from "@/utils/pokemon"
import { Button } from "@nextui-org/react"

interface Props {
  pokemon: PokemonBase
  errorCode: number
}

const PokemonDetail = ({ pokemon, errorCode }: Props) => {
  const [displayMovementCount, setDisplayMovementCount] = useState(1)
  const POKEMON_INDEX = getPokemonIndex(pokemon && pokemon.id)

  const showPokemonTypes = () =>
    pokemon.types.map((type) => (
      <li
        key={type.slot}
        className={`${getPokemonColorType(
          type.name
        )} px-2 py-1 bg-cyan-700 rounded`}
      >
        {type.name}
      </li>
    ))

  const showPokemonStatsData = () =>
    pokemon.stats.map((stat, index) => (
      <div key={index} className="my-2 rounded p-1 bg-cyan-700">
        <div
          className="rounded px-2 bg-cyan-500"
          style={{ width: `${stat.base}%` }}
        >
          {stat.name}: {stat.base}
        </div>
      </div>
    ))

  const showPokemonAbilitiesData = () =>
    pokemon.abilities.map((ability, index) => (
      <div key={index} className="my-2 rounded p-1">
        <div className="rounded px-2">{ability.name}</div>
      </div>
    ))

  const showPokemonMovementsData = () =>
    pokemon.moves.slice(0, displayMovementCount).map((move, index) => (
      <div key={index} className="my-2 rounded p-1">
        <div className="rounded px-2">{move.name}</div>
      </div>
    ))

  const handleAddMovementClick = () =>
    setDisplayMovementCount((prevCount) => prevCount + 1)

  return errorCode === undefined ? (
    <Layout title={capitalizePokemonName(pokemon.name)}>
      <div>
        <Link className="pb-10 font-medium" href="/">
          Back
        </Link>
      </div>
      <div className="p-10 bg-cyan-950">
        <div className="flex flex-col justify-center items-center">
          <h2 className={"text-2xl"}>{capitalizePokemonName(pokemon.name)}</h2>
          <Image
            width={200}
            height={200}
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${POKEMON_INDEX}.png`}
            alt={pokemon.name}
          />
        </div>
        <div className="w-6/12 m-auto text-center">
          <ul className="flex gap-5 text-center justify-center text-lg">
            {showPokemonTypes()}
          </ul>
          <div className="flex mt-5">
            <div className="flex-1">
              <p className="p-2 bg-slate-500 rounded w-fit mx-auto">Stats</p>
              <div>{showPokemonStatsData()}</div>
            </div>
            <div className="flex-1">
              <p className="p-2 bg-slate-500 rounded w-fit mx-auto">Moves</p>
              <div>{showPokemonMovementsData()}</div>
              {displayMovementCount < 5 && (
                <Button onClick={handleAddMovementClick}>+</Button>
              )}
            </div>
          </div>
          <div className="mt-5">
            <p className="p-2 bg-slate-500 rounded w-fit mx-auto">Abilities</p>
            <div>{showPokemonAbilitiesData()}</div>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <div className="flex flex-col h-screen justify-center items-center">
      <p className="text-lg">Sorry, we could not find that pokemon.</p>
      <p className="mt-2">
        <Link href="/">Back</Link>
      </p>
    </div>
  )
}

export default PokemonDetail

export async function getServerSideProps(context) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
    )
    const pokemon = await response.json()

    const pokemonData = {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((pokemonType) => {
        return {
          slot: pokemonType.slot,
          name: pokemonType.type.name,
        }
      }),
      stats: pokemon.stats.map((statInfo) => {
        return {
          base: statInfo.base_stat,
          name: statInfo.stat.name,
        }
      }),
      moves: pokemon.moves.slice(0, 5).map((moveInfo) => {
        return {
          name: moveInfo.move.name,
        }
      }),
      abilities: pokemon.abilities.map((ability) => {
        return {
          name: ability.ability.name,
        }
      }),
    }

    return {
      props: {
        pokemon: pokemonData,
      },
    }
  } catch (err) {
    return {
      props: {
        errorCode: 500 | 404,
      },
    }
  }
}
