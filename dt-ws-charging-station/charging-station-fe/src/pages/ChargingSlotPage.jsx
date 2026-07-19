import { Button, Container, Dropdown, Form, Pagination, Table, Badge, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axios/axiosClient.js";

const ChargingSlotPage = () => {
    const [slots, setSlots] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Hãy chắc chắn backend trả về tổng số trang để cập nhật state này
    const [size, setSize] = useState(10);
    const [stationId, setStationId] = useState('');
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axiosClient.get(`http://localhost:8080/api/v1/slots?page=${page}&size=${size}&stationId=${stationId}`);
                const responseStation = await axiosClient.get(`http://localhost:8080/api/v1/stations`);

                setSlots(response.data?.content || response.content || []);
                setStations(responseStation.data || responseStation.content || []);

                // Cập nhật totalPages từ dữ liệu phân trang của backend nếu có (ví dụ: response.data?.totalPages)
                if (response.data?.totalPages) {
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error("Failed to fetch charging slots:", error);
            }
        };

        fetchSlots();
    }, [page, size, stationId]);

    const renderPaginationItems = () => {
        let items = [];
        for (let number = 0; number < totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => setPage(number)}
                >
                    {number + 1}
                </Pagination.Item>
            );
        }
        return items;
    };

    const renderSizeOptions = () => {
        const options = [5, 10, 20, 50];
        return options.map(option => (
            <Dropdown.Item key={option} onClick={() => setSize(option)}>
                {option} rows
            </Dropdown.Item>
        ));
    };

    return (
        <Container className="my-5">
            {/* Tiêu đề chính */}
            <h2 className="text-dark fw-bold mb-4">Charging Slots</h2>

            {/* Thanh công cụ Bộ lọc & Nút Thêm mới */}
            <Card className="border-0 shadow-sm p-3 mb-4" style={{ borderRadius: "16px" }}>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div className="d-flex align-items-center gap-3 flex-grow-1" style={{ maxWidth: "500px" }}>
                        <Form.Select
                            className="py-2 text-secondary border-light-subtle"
                            style={{ borderRadius: "8px" }}
                            onChange={(e) => setStationId(e.target.value)}
                            value={stationId}
                        >
                            <option value="">Filter by Station Location</option>
                            {stations?.map(s => (
                                <option key={s.id} value={s.id}>{s.location}</option>
                            ))}
                        </Form.Select>

                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                className="py-2 border-light-subtle text-dark fw-medium"
                                style={{ borderRadius: "8px" }}
                            >
                                {size} per page
                            </Dropdown.Toggle>
                            <Dropdown.Menu>{renderSizeOptions()}</Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <Button
                        variant="success"
                        className="px-4 py-2 border-0 fw-medium"
                        style={{ borderRadius: "8px", backgroundColor: "#059669" }}
                        onClick={() => navigate("/add-new-slot")}
                    >
                        + Add Slot
                    </Button>
                </div>
            </Card>

            {/* Bảng Danh sách dữ liệu */}
            <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: "16px" }}>
                <Table responsive hover className="align-middle mb-0 text-nowrap">
                    <thead className="table-light text-secondary">
                    <tr>
                        <th className="py-3 px-4 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>ID</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Slot Name</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Station Location</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Max Power</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Connector</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Status</th>
                        <th className="py-3 px-4 text-end text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {slots && slots.length > 0 ? (
                        slots.map((s) => (
                            <tr key={s.id} className="border-bottom border-light-subtle">
                                <td className="py-3 px-4 text-secondary">{s.id}</td>
                                <td className="fw-semibold text-dark">{s.slotName}</td>
                                <td className="text-secondary">{s.station?.location || "N/A"}</td>
                                <td className="text-dark fw-medium">{s.maxPowerKw} kW</td>
                                <td className="text-secondary"><Badge bg="light" className="text-dark border px-2 py-1.5">{s.connectorStandard}</Badge></td>
                                <td>
                                    {s.isDisabled ? (
                                        <Badge bg="danger-subtle" className="text-danger px-2 py-1.5 fw-semibold">Disabled</Badge>
                                    ) : (
                                        <Badge bg="success-subtle" className="text-success px-2 py-1.5 fw-semibold" style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
                                            Active
                                        </Badge>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-end">
                                    <Button
                                        variant="light"
                                        size="sm"
                                        className="me-2 text-primary fw-medium px-3 py-1"
                                        style={{ borderRadius: "6px" }}
                                        onClick={() => navigate(`/details/${s.id}`)}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="light"
                                        size="sm"
                                        className="text-danger fw-medium px-3 py-1"
                                        style={{ borderRadius: "6px" }}
                                        onClick={() => navigate(`/delete/${s.id}`)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-5 text-muted">
                                No charging slots found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Card>

            {/* Thanh điều hướng phân trang */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination size="sm">
                        <Pagination.First onClick={() => setPage(0)} disabled={page === 0}/>
                        <Pagination.Prev onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}/>
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}/>
                        <Pagination.Last onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}/>
                    </Pagination>
                </div>
            )}
        </Container>
    );
};

export default ChargingSlotPage;