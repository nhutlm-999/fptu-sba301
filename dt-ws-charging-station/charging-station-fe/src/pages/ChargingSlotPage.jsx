import {Container, Form, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import axiosClient from "../axios/axiosClient.js";

const ChargingSlotPage = () => {
    const [slots, setSlots] = useState([]);
    const [page, setPage]= useState(0);
    const [size, setSize] = useState(10);
    const [stationId, setStationId] = useState('');
    const [stations, setStations] = useState([]);
    const [slotName, setSlotName] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axiosClient.get(`http://localhost:8080/api/v1/slots?page=${page}&size=${size}&stationId=${stationId}`);
                const responseStation = await axiosClient.get(`http://localhost:8080/api/v1/stations`)

                // Note: Standard Axios nests the server response inside a 'data' property.
                // If your axiosClient custom interceptor already unwraps it, use response.content.
                // Otherwise, you might need response.data.content.
                setSlots(response.data?.content || response.content || []);
                setStations(responseStation.data || responseStation.content);
            } catch (error) {
                console.error("Failed to fetch charging slots:", error);
            }
        };

        fetchSlots();
    }, [page, size, stationId]);



    return (
        <Container>
            <h1>Charging Slot</h1>

            <Form.Select onChange={(e) => setStationId(e.target.value)} aria-label="Default select example">
                <option value="">Open this select menu</option>
                {stations?.map(s => (
                    <option key={s.id} value={s.id}>{s.location}</option>
                ))}
            </Form.Select>


            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Slot Name</th>
                    <th>Station Location</th>
                    <th>Max Power(KW)</th>
                    <th>Connector</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {slots && slots.length > 0 ? (
                    slots.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>

                            {/* 2. Slot Name */}
                            <td>{s.slotName}</td>

                            {/* 3. Station Location (safe nested object access) */}
                            <td>{s.station?.location || "N/A"}</td>

                            {/* 4. Max Power */}
                            <td>{s.maxPowerKw} kW</td>

                            {/* 5. Connector Standard */}
                            <td>{s.connectorStandard}</td>

                            {/* 6. Status: rendered with bootstrap color badges */}
                            <td>
                                {s.isDisabled ? (
                                    <span className="badge bg-danger">Disabled</span>
                                ) : (
                                    <span className="badge bg-success">Active</span>
                                )}
                            </td>

                            {/* 7. Action Button */}
                            <td>
                                <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => navigate(`/details/${s.id}`)}>
                                    View
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center text-muted">
                            No charging slots found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    )
}

export default ChargingSlotPage;