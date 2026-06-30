import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export const ArtistList = ({source}) => {
    return (
        <Container>
            {/*<h1>Artist List</h1>*/}
        <Table striped bordered hover>
            <thead>
            <tr>
                <th style={{width: '10%'}}>Number</th>
                <th style={{width: '60%'}}>Artist Name</th>
                <th style={{width: '30%'}}>Actions</th>
            </tr>
            </thead>
            <tbody>

            {
                source.length > 0 ?
                source.map((user) =>
                <tr key={user.artistId}>
                    <td>{user.artistId}</td>
                    <td>{user.name}</td>
                    <td>
                        {/*String interpolate*/}
                        <Button className={"me-2"} variant={"primary"} as={Link} to={`/chinh-sua-nghe-si/${user.artistId}`} size="sm">Edit</Button>
                        <Button variant={"danger"} as={Link} to={`/xoa-nghe-si/${user.artistId}`} size={'sm'}>Delete</Button>
                    </td>
                </tr>) : <tr><td colSpan={3} >There is no Artist</td></tr>}
            </tbody>
        </Table>
        </Container>
    )
}