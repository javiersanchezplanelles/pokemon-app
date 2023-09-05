import React from "react"
import { render, screen } from "@testing-library/react"
import { DropdownComponent } from "../dropdown.component"
import { PokemonTypesList } from "@/domain/pokemon/pokemon.types"

describe("DropdownComponent", () => {
  const setSelectedPokemonType = jest.fn()
  const selectedPokemonType = "grass"

  it("should render the button", async () => {
    render(
      <DropdownComponent
        setSelectedPokemonType={setSelectedPokemonType}
        selectedPokemonType={PokemonTypesList[0].name}
      />
    )
    const dropdownButton = await screen.findByRole("button", {
      name: PokemonTypesList[0].name,
    })

    expect(dropdownButton).toBeInTheDocument()
  })
})
