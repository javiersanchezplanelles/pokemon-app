import Layout from "../components/layout/layout"
import { PokemonCardComponent } from "../components/pokemon-card/pokemon-card.component"
import { useState } from "react"
import { useRouter } from "next/router"
import { SearchbarComponent } from "../components/searchbar/searchbar.component"
import { Pokemon } from "../domain/pokemon/pokemon.types"
import { buildNextUrl, getOffsetFromUrl } from "../utils/url"

interface PokemonResponse {
  pokemonList: {
    count: number
    next: string
    previous: string
    results: Pokemon[]
  }
}

export default function Home({ pokemonList }: PokemonResponse) {
  const FIRST_POKEMON_GENERATION_COUNT = 151
  const MAX_PAGE_LIMIT = 20
  const [offset, setOffset] = useState(getOffsetFromUrl(pokemonList.next))
  const [pokemons, setPokemons] = useState(pokemonList)
  const [searchbarInput, setSearchbarInput] = useState("")

  const router = useRouter()

  const handleSearchbar = async () => {
    router.push(`/pokemon-detail/${searchbarInput}`)
  }

  const handleLoadMore = async (url: string) => {
    const response = await fetch(url)
    const nextPokemon = await response.json()
    const updatedPokemonList = pokemons.results.concat(nextPokemon.results)
    const currentOffset = getOffsetFromUrl(nextPokemon.next)
    setOffset(currentOffset)
    const pokemonToBeLoadedCount =
      FIRST_POKEMON_GENERATION_COUNT - currentOffset
    const currentPageLimit = Math.min(MAX_PAGE_LIMIT, pokemonToBeLoadedCount)

    setPokemons({
      ...pokemons,
      next: buildNextUrl(nextPokemon.next, currentPageLimit),
      results: updatedPokemonList,
    })
  }

  return (
    <Layout title={"Pokemon list"}>
      <SearchbarComponent
        setSearchbarInput={setSearchbarInput}
        onSearch={handleSearchbar}
      />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {pokemons.results.map((pokemon: Pokemon, index: number) => (
          <PokemonCardComponent
            key={pokemon.name}
            pokemon={pokemon}
            index={index}
          />
        ))}
      </section>
      <div className="text-center mt-5">
        <button
          onClick={() => handleLoadMore(pokemons.next)}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          disabled={offset >= FIRST_POKEMON_GENERATION_COUNT}
        >
          Load more
        </button>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon")
  const pokemonList = await response.json()

  return {
    props: {
      pokemonList,
    },
  }
}

// more testing
// add error page
