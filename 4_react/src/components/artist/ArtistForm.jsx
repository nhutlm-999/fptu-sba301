import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FavoriteGenre} from "../genre/FavoriteGenre.jsx";
import {useState} from "react";

export function ArtistForm() {
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [name, setName] = useState("");
    const navigate = useNavigate();

    // Gia lap sleep (wait 2s)
    const sleep = (ms) => new Promise(
        (evo) => {
            setTimeout(evo, ms)
        })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        await sleep(2000);
        // fetch -> datatype Promise<T>
        // await fetch -> return về T
        const res = await fetch("http://localhost:8080/api/v1/artists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name})
        })

        if (res.status === 201) {
            // redirect to list page
            navigate("/danh-sach-nghe-si");
        } else if (res.status === 400) {
            const data = await res.json();
            setError(data.errors.defaultMessage);
        }

        setIsSubmitting(false);
    };

    console.log({name});

    return (
        <Container>
            <h1>Artist Form</h1>

            <h1>{error}</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter artist name"
                                  value={name}
                                  required
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                {/*<Form.Group className="mb-3" controlId="formBasicPassword">*/}
                {/*    <Form.Label>Password</Form.Label>*/}
                {/*    <Form.Control type="password" placeholder="Password" />*/}
                {/*</Form.Group>*/}

                <div>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button variant="secondary" className={"ms-2"} type="reset">
                        Reset
                    </Button>
                    <Button variant="outline-secondary" className={"ms-2"} as={Link} to={'/artists'}>
                        Back to List
                    </Button>
                </div>

                {/*<Row>*/}
                {/*    <Col className={"mt-3"}>*/}
                {/*        <FavoriteGenre/>*/}
                {/*    </Col>*/}
                {/*    <Col className={"mt-3"}>*/}
                {/*        <FavoriteGenre/>*/}
                {/*    </Col>*/}
                {/*    <Col className={"mt-3"}>*/}
                {/*        <FavoriteGenre/>*/}
                {/*    </Col>*/}
                {/*</Row>*/}

            </Form>
        </Container>
    )
}