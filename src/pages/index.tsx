import { PokemonCard } from "@/components/pokemon-card/pokemon-card.component"
import { useState } from "react"

export default function Home({ pokemonList }) {
  const [pokemons, setPokemons] = useState(pokemonList)

  return (
    <main>
      <header>
        <h1>Pokemon list</h1>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {pokemons.results.map((pokemon, index) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} index={index} />
        ))}
      </section>
    </main>
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
