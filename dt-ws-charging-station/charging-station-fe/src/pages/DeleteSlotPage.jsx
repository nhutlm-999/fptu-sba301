import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosClient from "../axios/axiosClient.js";
import { useNavigate, useParams } from "react-router-dom";

const DeleteSlotPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [slot, setSlot] = useState(null);

    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const res = await axiosClient.get(`/v1/slots/${id}`);
                setSlot(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSlot();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient.delete(`/v1/slots/${id}`);
            if (res.status === 204) {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!slot) {
        return (
            <Container className="mt-5" style={{ maxWidth: "650px" }}>
                <p className="text-muted">Loading slot details...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "650px" }}>
            <Card className="border-0 shadow-sm p-3" style={{ borderRadius: "20px" }}>
                <Card.Body className="p-2">
                    <div className="text-dark fw-bold fs-4 border-bottom pb-3 mb-4">
                        Delete slot
                    </div>

                    <Alert variant="danger" className="border-0 rounded-3 mb-4 py-2.5 px-3 fs-6">
                        Warning: This action cannot be undone.
                    </Alert>

                    <Form onSubmit={handleSubmit}>
                        <Row className="border-bottom py-2.5 align-items-center fs-6">
                            <Col xs={5} className="text-secondary fw-medium">Slot name</Col>
                            <Col xs={7} className="text-dark fw-medium">{slot.slotName}</Col>
                        </Row>
                        <Row className="py-2.5 align-items-center fs-6 mb-4">
                            <Col xs={5} className="text-secondary fw-medium">Station</Col>
                            <Col xs={7} className="text-dark fw-medium">{slot.station?.location || "N/A"}</Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="secondary"
                                className="px-4 py-2 border-0 fw-medium"
                                style={{ backgroundColor: "#5c677d", borderRadius: "8px" }}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                className="px-4 py-2 border-0 fw-medium"
                                style={{ borderRadius: "8px" }}
                            >
                                Delete
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DeleteSlotPage;