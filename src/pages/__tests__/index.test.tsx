import { render, screen } from "@testing-library/react"
import Home from ".."
import { pokemonList } from "@/helpers/pokemon"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

const useRouterMock = useRouter as jest.Mock

describe("Header container", () => {
  beforeEach(() => {
    render(<Home pokemonDataList={pokemonList} />)
  })

  it("should render the header", () => {
    const header = screen.getByRole("banner")

    expect(header).toBeInTheDocument()
  })

  it("should render the footer", () => {
    const footer = screen.getByRole("contentinfo")

    expect(footer).toBeInTheDocument()
  })

  it.skip("should redirect to detail page after using the searchbar", () => {
    const push = jest.fn()
    useRouterMock.mockImplementation(() => ({
      pathname: "pokemon-detail/abra",
    }))
    render(<Home pokemonDataList={pokemonList} />)
    const input = screen.getByRole("textbox")

    userEvent.type(input, "abra")

    const searchButton = screen.getByRole("button", {
      name: /search/i,
    })

    userEvent.click(searchButton)

    expect(push).toHaveBeenCalledWith("/pokemon-detail/abra")
  })
})
