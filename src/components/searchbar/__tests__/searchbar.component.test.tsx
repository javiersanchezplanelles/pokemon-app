import React from "react"
import { SearchbarComponent } from "../searchbar.component"
import { render, screen } from "@testing-library/react"

describe("Searchbar", () => {
  const setSearchbarInput = jest.fn()
  const onSearch = jest.fn()

  it("should be rendered", () => {
    render(
      <SearchbarComponent
        setSearchbarInput={setSearchbarInput}
        onSearch={onSearch}
      />
    )
    const input = screen.getByRole("textbox")

    expect(input).toBeInTheDocument()
  })
})
