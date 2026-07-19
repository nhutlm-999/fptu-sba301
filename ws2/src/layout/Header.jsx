import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary m-3">
            <Container> {/* Container mở ra Grid System*/}
                <Navbar.Brand href="#">Car Parking Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#parkings">Parking</Nav.Link>
                        <Nav.Link href="#checkin">Checkin</Nav.Link>
                    </Nav></Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;