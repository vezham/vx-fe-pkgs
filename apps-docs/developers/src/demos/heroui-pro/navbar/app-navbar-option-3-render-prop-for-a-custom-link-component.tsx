// Adapted documented HeroUI Pro example; see ../README.md.
import Link from 'next/link'

import { Navbar } from '@vezham/react-pro-v3'

export function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Content>
          <Navbar.Item
            href="/features"
            render={props => <Link href="/features" {...props} />}>
            Features
          </Navbar.Item>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
