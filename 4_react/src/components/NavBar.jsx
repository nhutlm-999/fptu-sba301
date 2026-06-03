import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container> {/* Container mở ra Grid System*/}
                <Navbar.Brand href="#home">FPT Music Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Artist" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={'artists/new'}>Add new</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav.Link href="#home">Login</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;