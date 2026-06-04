import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FavoriteGenre} from "../genre/FavoriteGenre.jsx";

export function ArtistForm() {
    return (
        <Container>
            <h1>Artist Form</h1>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter artist name"/>
                    <Form.Text className="text-muted">
                        We'll never share your name with anyone else.
                    </Form.Text>
                </Form.Group>

                {/*<Form.Group className="mb-3" controlId="formBasicPassword">*/}
                {/*    <Form.Label>Password</Form.Label>*/}
                {/*    <Form.Control type="password" placeholder="Password" />*/}
                {/*</Form.Group>*/}

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" className={"ms-2"} type="reset">
                        Reset
                    </Button>
                    <Button variant="outline-secondary" className={"ms-2"} as={Link} to={'/danh-sach-nghe-si'}>
                        Back to List
                    </Button>
                </div>

                <Row>
                    <Col className={"mt-3"}>
                        <FavoriteGenre/>
                    </Col>
                    <Col className={"mt-3"}>
                        <FavoriteGenre/>
                    </Col>
                    <Col className={"mt-3"}>
                        <FavoriteGenre/>
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}