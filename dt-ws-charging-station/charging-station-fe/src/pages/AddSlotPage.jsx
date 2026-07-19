import {Button, Card, Container, Form, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";
import {useNavigate} from "react-router-dom";

const AddSlotPage = () => {
    const [slotName, setSlotName] = useState('');
    const [station, setStation] = useState('');
    const [maxPower, setMaxPower] = useState('');
    const [connectorStandard, setConnectorStandard] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const resStations = await axiosClient.get(`http://localhost:8080/api/v1/stations`);
                setStations(resStations.data || resStations.content);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosClient.post(`http://localhost:8080/api/v1/slots`, {
                slotName,
                stationId: station,
                maxPowerKw: maxPower,
                connectorStandard,
                isDisabled: false
            });
            console.log("Slot added successfully:", res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <Card className={"mt-4"} style={{ maxWidth: "600px" }}>
                <Card.Body>
                    <Card.Title>Add New Slot</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => setSlotName(e.target.value)}>
                            <Form.Label>Slot name</Form.Label>
                            <Form.Control type="text" placeholder="e.g. S01"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Station</Form.Label>
                            <Form.Select aria-label="Default select example" className="mb-3" onChange={(e) => setStation(e.target.value)} required>
                                <option>Select Station</option>
                                {stations?.map((station) => <option key={station.id} value={station.id}>{station.location}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e) => setMaxPower(e.target.value)} required>
                            <Form.Label>Max power</Form.Label>
                            <Form.Control type="text" placeholder={"e.g. 150"}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Connector Standard</Form.Label>
                            <Form.Select aria-label="Default select example" required className="mb-3" onChange={(e) => setConnectorStandard(e.target.value)}>
                                <option>Select connector</option>
                                <option value="Type C">Type C</option>
                                <option value="USB">USB</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Check type="checkbox" label="Diables" value={isDisabled} onClick={() => setIsDisabled(!isDisabled)}/>

                        <div className="d-flex justify-content-end mt-3 gap-2">
                            <Button variant="outline-dark" type="button" onClick={() => navigate("/")}>Back</Button>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AddSlotPage;