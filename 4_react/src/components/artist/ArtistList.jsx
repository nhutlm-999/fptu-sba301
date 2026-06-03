import {Button, Container, Table} from "react-bootstrap";
import {useState} from "react";



export const ArtistList = ({source}) => {


    return (
        <Container>
            {/*<h1>Artist List</h1>*/}
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Number</th>
                <th>Artist Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            {
                source.length > 0 ?
                source.map((user) =>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                        <Button className={"me-2"} variant={"primary"} onClick={() => alert(`Edit artist ${user.name}`)}>Edit</Button>
                        <Button variant={"danger"} onClick={() => alert("Delete artist")}>Delete</Button>
                    </td>
                </tr>) : <tr><td colSpan={3} >There is no Artist</td></tr>}
            </tbody>
        </Table>
        </Container>
    )
}