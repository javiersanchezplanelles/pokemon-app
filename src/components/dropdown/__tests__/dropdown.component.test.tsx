import React from "react"
import { render, screen } from "@testing-library/react"
import { DropdownComponent } from "../dropdown.component"

describe("DropdownComponent", () => {
  const setSelectedPokemonType = jest.fn()

  it("should render the button", async () => {
    render(
      <DropdownComponent setSelectedPokemonType={setSelectedPokemonType} />
    )
    const dropdownButton = await screen.findByRole("button", { name: /fire/i })

    expect(dropdownButton).toBeInTheDocument()
  })
})
