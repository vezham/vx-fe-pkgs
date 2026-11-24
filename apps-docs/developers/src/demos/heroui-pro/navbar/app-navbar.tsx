// Adapted documented HeroUI Pro example; see ../README.md.
import { Navbar } from '@vezham/react-pro-v3'

export function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Acme</Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item href="/features">Features</Navbar.Item>
          <Navbar.Item href="/pricing">Pricing</Navbar.Item>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
