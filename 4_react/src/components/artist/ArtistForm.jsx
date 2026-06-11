import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function ArtistForm() {
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const {id} = useParams(); // Lấy id từ URL nếu có, dùng để phân biệt giữa create và edit
    const isEditMode = !!id; // Nếu id tồn tại thì là edit mode, ngược lại là create mode

    useEffect(() => {
        if (isEditMode) {
            fetch(`http://localhost:8080/api/v1/artists/${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Fail to fetch artist details.");
                    }
                    return res.json()
                }).then(data => {
                setName(data.name);
            }).catch(error => {
                console.error("Error fetching artist details: ", error);
                setError(error instanceof Error ? error.message : "Unknown error");
            });
        }
    }, [isEditMode, id]); // Chỉ chạy effect khi ở edit mode và id thay đổi


    // Gia lap sleep (wait 2s)
    const sleep = (ms) => new Promise(
        (evo) => {
            setTimeout(evo, ms)
        })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            await sleep(2000);

            if (isEditMode) {
                const res = await fetch(`http://localhost:8080/api/v1/artists/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name})
                })

                if (res.status === 200) {
                    navigate("/danh-sach-nghe-si");
                    return;
                }

                if (!res.ok) {
                    let message = "Fail to create artist.";

                    // const data = await res.json();
                    // console.log("Server returns: ", data); // In ra để xem cấu trúc
                    // message = data?.error || message;

                    throw new Error(message);
                }
            } else {
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
                    return;
                }


                if (!res.ok) {
                    let message = "Fail to create artist.";

                    const data = await res.json();
                    console.log("Server returns: ", data); // In ra để xem cấu trúc
                    message = data?.error || message;

                    throw new Error(message);
                }
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <h1>{isEditMode ? 'Edit Artist' : 'Artist Form'}</h1>

            {!!error && <Row>
                <Col xs={12} md={6}>
                    <Alert variant="danger">{error}</Alert>
                </Col>
            </Row>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label column={false}>Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter artist name"
                                  value={name}
                                  required
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <div>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button variant="secondary" className={"ms-2"} type="reset" onClick={() => setName("")}>
                        Reset
                    </Button>
                    <Button variant="outline-secondary" className={"ms-2"} as={Link} to={'/danh-sach-nghe-si'}>
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