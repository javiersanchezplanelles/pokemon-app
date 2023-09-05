import React from "react"
import { HeaderComponent } from "../header/header.component"
import { FooterComponent } from "../footer/footer.component"
import { HeadComponent } from "../head/head.component"

const Layout = ({ children, title }) => {
  return (
    <div>
      <HeadComponent title={title} />
      <HeaderComponent title={title} />
      <main className="container mx-auto">{children}</main>
      <FooterComponent />
    </div>
  )
}

export default Layout
