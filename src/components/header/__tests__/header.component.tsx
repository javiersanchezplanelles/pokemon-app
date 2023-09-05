import { render, screen } from "@testing-library/react"
import { HeaderComponent } from "../header.component"

describe("HeaderComponent", () => {
  const title = "Abra"

  it("should be rendered", () => {
    render(<HeaderComponent title={title} />)
    const header = screen.getByRole("banner")

    expect(header).toBeInTheDocument()
  })
})
