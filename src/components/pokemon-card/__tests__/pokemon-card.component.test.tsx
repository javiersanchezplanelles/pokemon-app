import React from "react"
import { render, screen } from "@testing-library/react"
import { PokemonCardComponent } from "../pokemon-card.component"
import { pokemonList } from "../../../helpers/pokemon"

describe("PokemonCardComponent", () => {
  beforeEach(() => {
    render(<PokemonCardComponent pokemon={pokemonList[0]} />)
    jest.clearAllMocks()
  })

  it("should render an image", () => {
    const pokemonCardImage = screen.getByRole("img", {
      name: /bulbasaur/i,
    })

    expect(pokemonCardImage).toBeInTheDocument()
  })

  it("should render a name", () => {
    const pokemonCardName = screen.getByText(/bulbasaur/i)

    expect(pokemonCardName).toBeInTheDocument()
  })
})
