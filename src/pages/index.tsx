import Layout from "../components/layout/layout"
import { PokemonCardComponent } from "../components/pokemon-card/pokemon-card.component"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { SearchbarComponent } from "../components/searchbar/searchbar.component"
import { Pokemon, PokemonTypesList } from "../domain/pokemon/pokemon.types"
import { FilterModalComponent } from "../components/filter-modal/filter-modal.component"
import { FIRST_POKEMON_GENERATION_COUNT } from "@/domain/pokemon/pokemon.constants"

interface PokemonResponse {
  pokemonDataList: Pokemon[]
}

export default function Home({ pokemonDataList }: PokemonResponse) {
  const MAX_PAGE_LIMIT = 20
  const [offset, setOffset] = useState(0)
  const ORIGINAL_POKEMON_LOAD = pokemonDataList.slice(offset, MAX_PAGE_LIMIT)
  const [searchbarInput, setSearchbarInput] = useState("")
  const router = useRouter()
  const [selectedPokemonType, setSelectedPokemonType] = useState("")
  const handleSearchbar = () => {
    if (searchbarInput)
      router.push(`/pokemon-detail/${searchbarInput.toLowerCase()}`)
  }
  const [initialPokemonList, setInitialPokemonList] = useState(
    ORIGINAL_POKEMON_LOAD
  )

  const handleLoadMore = () => {
    setInitialPokemonList([
      ...initialPokemonList,
      ...pokemonDataList.slice(offset, offset + MAX_PAGE_LIMIT),
    ])
  }

  useEffect(() => {
    setOffset(initialPokemonList.length)
  }, [initialPokemonList])

  const handleOnFindModal = () => {
    const pokemonOfType = pokemonDataList.filter((pokemon: Pokemon) =>
      pokemon.types.some((type) => type.name === selectedPokemonType)
    )
    if (selectedPokemonType === PokemonTypesList[0].name) {
      setInitialPokemonList(pokemonDataList.slice(0, MAX_PAGE_LIMIT))
    } else {
      setInitialPokemonList(pokemonOfType)
    }
  }

  const handleOnClear = () => setSelectedPokemonType(PokemonTypesList[0].name)

  return (
    <Layout title={"Pokedex"}>
      <SearchbarComponent
        setSearchbarInput={setSearchbarInput}
        onSearch={handleSearchbar}
      />
      <FilterModalComponent
        selectedPokemonType={selectedPokemonType}
        setSelectedPokemonType={setSelectedPokemonType}
        onFind={handleOnFindModal}
        onClear={handleOnClear}
      />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {initialPokemonList.map((pokemon: Pokemon) => (
          <PokemonCardComponent key={pokemon.name} pokemon={pokemon} />
        ))}
      </section>
      <div className="text-center mt-5">
        <button
          onClick={handleLoadMore}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          disabled={offset >= FIRST_POKEMON_GENERATION_COUNT}
        >
          More
        </button>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${FIRST_POKEMON_GENERATION_COUNT}`
  )
  const pokemonList = await response.json()

  const pokemonDataList = await Promise.all(
    pokemonList.results.map(async (item) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${item.name}`
      )
      const pokemonJson = await response.json()

      return {
        id: pokemonJson.id,
        name: pokemonJson.name,
        url: "",
        types: pokemonJson.types.map((item) => {
          return {
            slot: item.slot,
            name: item.type.name,
          }
        }),
      }
    })
  )

  return {
    props: {
      pokemonDataList,
    },
  }
}
