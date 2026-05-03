import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const NavbarTop = () => {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Bloglist</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">blogs</Nav.Link>
            <Nav.Link as={Link} to="/users">users</Nav.Link>
          </Nav>
          {user && (
            <div className="d-flex align-items-center text-light">
              <span className="me-3">{user.name ?? user.username} logged in</span>
              <Button variant="outline-light" size="sm" onClick={logout}>logout</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarTop
