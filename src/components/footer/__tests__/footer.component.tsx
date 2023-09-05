import { render, screen } from "@testing-library/react"
import { FooterComponent } from "../footer.component"

describe("FooterComponent", () => {
  it("should be rendered", () => {
    render(<FooterComponent />)
    const footer = screen.getByRole("contentinfo")

    expect(footer).toBeInTheDocument()
  })
})
