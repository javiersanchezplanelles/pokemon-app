import { render, screen } from "@testing-library/react"
import Home from ".."
import { pokemonList } from "@/helpers/tests/pokemon"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

const useRouterMock = useRouter as jest.Mock

describe("Header container", () => {
  it.skip("should redirect to detail page after using the searchbar", () => {
    render(<Home pokemonDataList={pokemonList} />)

    const push = jest.fn()
    useRouterMock.mockImplementation(() => ({
      pathname: "pokemon-detail/abra",
    }))
    render(<Home pokemonDataList={pokemonList} />)

    const input = screen.getAllByRole("textbox")[0]

    userEvent.type(input, "abra")

    const searchButton = screen.getAllByRole("button", {
      name: /search/i,
    })[0]

    userEvent.click(searchButton)

    expect(push).toHaveBeenCalledWith("/pokemon-detail/abra")
  })
})
