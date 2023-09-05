import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Home from ".."
import { pokemonList } from "@/helpers/tests/pokemon"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

const useRouterMock = useRouter as jest.Mock

describe("Header container", () => {
  it("should redirect to detail page after using the searchbar", async () => {
    render(<Home pokemonDataList={pokemonList} />)

    const push = jest.fn()
    useRouterMock.mockImplementation(() => ({
      push,
    }))

    const input = screen.getByRole("textbox")

    fireEvent.change(input, { target: { value: "abra" } })

    const searchButton = screen.getByRole("button", {
      name: /search/i,
    })

    userEvent.click(searchButton)

    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/pokemon-detail/abra")
    )
  })
})
