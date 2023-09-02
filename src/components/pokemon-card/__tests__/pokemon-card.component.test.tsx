import React from "react"
import { render, screen } from "@testing-library/react"
import { PokemonCardComponent } from "../pokemon-card.component"
import { POKEMON_FIRST_GENERATION } from "../../../helpers/pokemonList"

describe("PokemonCardComponent", () => {
  const bulbasaurIndex = 0o1
  const bulbasaur = POKEMON_FIRST_GENERATION[0]

  it("should render an image", () => {
    render(<PokemonCardComponent pokemon={bulbasaur} index={bulbasaurIndex} />)
    const pokemonCardImage = screen.getByRole("img", {
      name: /bulbasaur/i,
    })

    expect(pokemonCardImage).toBeInTheDocument()
  })

  it("should render a name", () => {
    render(<PokemonCardComponent pokemon={bulbasaur} index={bulbasaurIndex} />)
    const pokemonCardName = screen.getByText(/bulbasaur/i)

    expect(pokemonCardName).toBeInTheDocument()
  })
})
