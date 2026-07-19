import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useTheme} from "../context/ThemeContext.jsx";

const Header = () => {
    const {theme, toggle} = useTheme();

    console.log("Current theme:", theme);
    return (
        <Navbar bg={theme} variant={theme} expand="lg" className="bg-body-tertiary m-3">
            <Container> {/* Container mở ra Grid System*/}
                <Navbar.Brand href="#">FPT Music Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Artist" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={'/danh-sach-nghe-si'}>List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/them-moi-nghe-si'}>Add new</NavDropdown.Item>
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