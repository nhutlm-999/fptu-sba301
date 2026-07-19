import { Badge, Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosClient from "../axios/axiosClient.js";

const SlotDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [slot, setSlot] = useState(null);

    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const res = await axiosClient.get(`http://localhost:8080/api/v1/slots/${id}`);
                setSlot(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSlot();
    }, [id]);

    if (!slot) {
        return (
            <Container className="mt-4" style={{ maxWidth: "600px" }}>
                <p className="text-muted">Loading slot details...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "650px" }}>
            <Card className="border-0 shadow-sm p-3" style={{ borderRadius: "20px" }}>
                <Card.Body className="p-2">
                    {/* Tiêu đề chính */}
                    <div className="text-dark fw-bold fs-4 border-bottom pb-3 mb-4">
                        Slot details
                    </div>

                    {/* PHẦN 1: SLOT INFORMATION */}
                    <div className="text-muted fw-bold small text-uppercase mb-3 tracking-wide" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
                        Slot information
                    </div>

                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">ID</Col>
                        <Col xs={7} className="text-dark fw-medium">{slot.id}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Slot name</Col>
                        <Col xs={7} className="text-dark fw-medium">{slot.slotName}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Max power (kW)</Col>
                        <Col xs={7} className="text-dark fw-medium">{slot.maxPowerKw}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Connector standard</Col>
                        <Col xs={7} className="text-dark fw-medium">{slot.connectorStandard}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Status</Col>
                        <Col xs={7}>
                            {slot.isDisabled ? (
                                <Badge bg="danger" className="px-2 py-1.5 fw-semibold">Disabled</Badge>
                            ) : (
                                <Badge bg="success-subtle" className="text-success px-2 py-1.5 fw-semibold" style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
                                    Enabled
                                </Badge>
                            )}
                        </Col>
                    </Row>

                    {/* PHẦN 2: STATION INFORMATION */}
                    <div className="text-muted fw-bold small text-uppercase mt-4 mb-3" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
                        Station information
                    </div>

                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">ID</Col>
                        <Col xs={7} className="text-dark fw-medium">{slot.station?.id || "N/A"}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Location</Col>
                        <Col xs={7} className="text-dark fw-medium">{slot.station?.location}</Col>
                    </Row>
                    <Row className="py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Responsible</Col>
                        <Col xs={7} className="text-dark fw-medium">{slot.station?.responsible}</Col>
                    </Row>

                    {/* Nút Back ở góc dưới cùng bên phải */}
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="secondary"
                            className="px-4 py-2 border-0 fw-medium"
                            style={{ backgroundColor: "#5c677d", borderRadius: "8px" }}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SlotDetail;