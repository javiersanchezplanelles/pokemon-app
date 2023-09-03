import React from "react"
import { SearchbarComponent } from "../searchbar.component"
import { render, screen } from "@testing-library/react"

describe("Searchbar", () => {
  const setSearchbarInput = jest.fn()
  const onSearch = jest.fn()

  it("should render the bar", () => {
    render(
      <SearchbarComponent
        setSearchbarInput={setSearchbarInput}
        onSearch={onSearch}
      />
    )
    const input = screen.getByRole("textbox")

    expect(input).toBeInTheDocument()
  })

  it("should render the search button", () => {
    render(
      <SearchbarComponent
        setSearchbarInput={setSearchbarInput}
        onSearch={onSearch}
      />
    )
    const searchButton = screen.getByRole("button", {
      name: /search/i,
    })

    expect(searchButton).toBeInTheDocument()
  })
})
