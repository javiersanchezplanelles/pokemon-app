import React from "react"
import { render, screen } from "@testing-library/react"
import { FilterModalComponent } from "../filter-modal.component"
import userEvent from "@testing-library/user-event"

describe("FilterModalComponent", () => {
  const onFind = jest.fn()
  const onClear = jest.fn()
  const setSelectedPokemonType = jest.fn()

  it("should render a button", () => {
    render(
      <FilterModalComponent
        onFind={onFind}
        onClear={onClear}
        setSelectedPokemonType={setSelectedPokemonType}
      />
    )
    const filterModalButton = screen.getByRole("button", {
      name: /filter by type/i,
    })

    expect(filterModalButton).toBeInTheDocument()
  })

  describe("upon clicking the button", () => {
    const clickButton = () => {
      const filterModalButton = screen.getByRole("button", {
        name: /filter by type/i,
      })

      userEvent.click(filterModalButton)
    }
    it("should render a header", async () => {
      render(
        <FilterModalComponent
          onFind={onFind}
          onClear={onClear}
          setSelectedPokemonType={setSelectedPokemonType}
        />
      )

      clickButton()

      const filterModalHeader = await screen.findByRole("banner")

      expect(filterModalHeader).toBeInTheDocument()
    })
    it("should render a footer", async () => {
      render(
        <FilterModalComponent
          onFind={onFind}
          onClear={onClear}
          setSelectedPokemonType={setSelectedPokemonType}
        />
      )

      clickButton()

      const filterModalFooter = await screen.findByRole("contentinfo")

      expect(filterModalFooter).toBeInTheDocument()
    })
  })
})
