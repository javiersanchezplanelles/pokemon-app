import Layout from "@/components/layout/layout"
import { PokemonCardComponent } from "@/components/pokemon-card/pokemon-card.component"
import { useState } from "react"
import { useRouter } from "next/router"
import { SearchbarComponent } from "@/components/searchbar/searchbar.component"
import { Pokemon } from "@/domain/pokemon/pokemon.types"

export default function Home({ pokemonList }) {
  const [pokemons, setPokemons] = useState(pokemonList)
  const [searchbarInput, setSearchbarInput] = useState("")
  const router = useRouter()

  const handleSearchbar = async () => {
    router.push(`/pokemon-detail/${searchbarInput}`)
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
