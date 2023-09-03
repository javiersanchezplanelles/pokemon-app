import { render, screen } from "@testing-library/react"
import Home from ".."
import { POKEMON_FIRST_GENERATION } from "@/helpers/pokemonList"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

const useRouterMock = useRouter as jest.Mock

describe("Header container", () => {
  const pokemonList = {
    count: 151,
    next: "next-url",
    previous: "",
    results: POKEMON_FIRST_GENERATION,
  }

  it("should render the header", () => {
    render(<Home pokemonList={pokemonList} />)

    const header = screen.getByRole("banner")

    expect(header).toBeInTheDocument()
  })

  it("should render the footer", () => {
    render(<Home pokemonList={pokemonList} />)

    const footer = screen.getByRole("contentinfo")

    const input = screen.getByRole("textbox")

    expect(footer).toBeInTheDocument()
  })

  it.skip("should redirect to detail page after using the searchbar", () => {
    const push = jest.fn()
    useRouterMock.mockImplementation(() => ({
      pathname: "pokemon-detail/abra",
    }))
    render(<Home pokemonList={pokemonList} />)
    const input = screen.getByRole("textbox")

    userEvent.type(input, "abra")

    const searchButton = screen.getByRole("button", {
      name: /search/i,
    })

    userEvent.click(searchButton)

    expect(push).toHaveBeenCalledWith("/pokemon-detail/abra")
  })
})
