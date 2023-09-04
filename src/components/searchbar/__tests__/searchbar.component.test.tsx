import React from "react"
import { SearchbarComponent } from "../searchbar.component"
import { render, screen } from "@testing-library/react"

describe("Searchbar", () => {
  const setSearchbarInput = jest.fn()
  const onSearch = jest.fn()

  beforeEach(() => {
    render(
      <SearchbarComponent
        setSearchbarInput={setSearchbarInput}
        onSearch={onSearch}
      />
    )
  })

  it("should render the bar", () => {
    const input = screen.getByRole("textbox")

    expect(input).toBeInTheDocument()
  })

  it("should render the search button", () => {
    const searchButton = screen.getByRole("button", {
      name: /search/i,
    })

    expect(searchButton).toBeInTheDocument()
  })
})
