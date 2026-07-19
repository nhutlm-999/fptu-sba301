import { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../axios/axiosClient.js";

const CheckIn = () => {
    const [cars, setCars] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await axiosClient.get("/cars");
                const carData = Array.isArray(res.data) ? res.data : [];
                setCars(carData);

                if (carData.length > 0) {
                    setSelectedCarId(carData[0].id);
                }
            } catch (error) {
                console.error("Lỗi tải danh sách xe: ", error);
                setErrorMessage("Failed to load car records.");
            }
        };
        fetchCars();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!selectedCarId) {
            setErrorMessage("Please select a valid license plate.");
            return;
        }

        try {
            const response = await axiosClient.post("/parkings", { carId: Number(selectedCarId) });
            if (response.status === 201 || response.status === 200) {
                alert("Vehicle checked in successfully!");
                navigate("/parkings");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage(error.response.data?.error || "Conflict: This car is already parked.");
            } else {
                setErrorMessage("An error occurred during check-in. Please try again.");
            }
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Vehicle Check-In</h2>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="carSelect">
                    <Form.Label>Select License Plate</Form.Label>
                    <Form.Select
                        value={selectedCarId}
                        onChange={(e) => setSelectedCarId(e.target.value)}
                    >
                        {cars.length === 0 ? (
                            <option value="">No cars available</option>
                        ) : (
                            cars.map((car) => (
                                <option key={car.id} value={car.id}>
                                    {car.licensePlate} ({car.color})
                                </option>
                            ))
                        )}
                    </Form.Select>
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit" disabled={cars.length === 0}>
                        Check In
                    </Button>
                    <Button variant="secondary" as={Link} to="/parkings">
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default CheckIn;