import {Button, Container, Form, Pagination, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";
import {Link} from "react-router-dom";

const ParkingList  = () => {
    const [parkings, setParkings] = useState([]);
    const [flag, setFlag] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const res = await axiosClient
                    .get(`/parkings?isParked=${flag}&page=${page}&size=20`);
                setParkings(res.data.content || []);
                setTotalPages(res.data.totalPages || 0);
            } catch (error) {
                console.error("Lỗi tải danh sách : ", error);
            }
        }

        fetchParkings();
    }, [flag, page]);

    const renderPagination = () => {
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
        return (
            <Pagination className="justify-content-center mt-3">
                <Pagination.Prev disabled={page === 0} onClick={() => setPage(page - 1)} />
                {items}
                <Pagination.Next disabled={page === totalPages - 1 || totalPages === 0} onClick={() => setPage(page + 1)} />
            </Pagination>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return "--";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        const pad = (num) => String(num).padStart(2, '0');
        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const fetchParkings = async () => {
        try {
            const res = await axiosClient.get(`/parkings?isParked=false&page=${page}&size=20`);
            setParkings(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
        } catch (error) {
            console.error("Lỗi tải danh sách: ", error);
        }
    };

    const calculateEstimateFee = (entryTime, exitTime) => {
        if (exitTime) return '---';
        if (entryTime) {
            const start = new Date(entryTime);
            const end = new Date();
            const hours = Math.ceil((end - start) / (1000 * 60 * 60));
            const validHours = hours > 0 ? hours : 0;
            const fee = validHours * 10000;
            return fee.toLocaleString('vi-VN') + ' VND';
        }
        return '---';
    };

    const handleCheckOut = async (id, licensePlate) => {
        const confirmed = window.confirm(`Check out car ${licensePlate}?`);
        if (!confirmed) return;

        try {
            await axiosClient.put(`/parkings/${id}`);
            alert("Check out successfully!");
            fetchParkings();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(error.response.data?.message || "Conflict: Car has already checked out.");
            } else {
                alert("An error occurred during check out.");
            }
        }

    };

    return (
        <Container>
            <h1>Parking List</h1>
            <div className="d-flex align-items-center gap-3">
                <Form.Check
                    type="switch"
                    id="parked-filter-switch"
                    label={flag ? "Currently Parked" : "All Records"}
                    checked={flag}
                    onChange={() => { setFlag(!flag); setPage(0); }}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th style={{width: '10%'}}>ID</th>
                    <th style={{width: '20%'}}>License Plate</th>
                    <th style={{width: '20%'}}>Entry Time</th>
                    <th style={{width: '20%'}}>Exit Time</th>
                    <th style={{width: '20%'}}>Estimate fee</th>
                    <th style={{width: '30%'}}>Actions</th>
                </tr>
                </thead>
                <tbody>

                {
                    parkings.length > 0 ?
                        parkings.map((p) =>
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.car.licensePlate}</td>
                                <td>{formatDate(p.entryTime)}</td>
                                <td>{formatDate(p.exitTime)}</td>
                                <td>{calculateEstimateFee(p.car?.entryTime, p.car?.exitTime)}</td>
                                <td>
                                    {p.exitTime === null ? (
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleCheckOut(p.id, p.car?.licensePlate)}
                                        >
                                            Check Out
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="success"
                                            size="sm">
                                            Checked out
                                        </Button>
                                    )}
                                </td>
                            </tr>) : <tr><td colSpan={3} >There is no Artist</td></tr>}
                </tbody>
            </Table>

            {totalPages > 1 && renderPagination()}
        </Container>
    )
}
export default ParkingList;