import {Container, Table} from "react-bootstrap";
import {useSearchParam} from 'react-router-dom';
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";

const SlotDetail = () => {
    const [searchParams] = useSearchParam();
    const id = searchParams.get('id');
    const [slot, setSlot] = useState({});

    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const res = axiosClient.get(`http://localhost:8080/api/v1/slots/${id}`);

            }  catch(error) {
                console.log(error);
            }
        }
        fetchSlot();

    }, [id]);
    return (
        <Container>
            <h1>Slot Details</h1>

            <p>Slot Information</p>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default SlotDetail