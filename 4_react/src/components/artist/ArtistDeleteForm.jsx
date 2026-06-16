import {Container, Button, Alert} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

const ArtistDeleteForm = () => {
    const [artist, setArtist] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {id} = useParams();
    const isDelete = !!id;


    const onDelete = () => {
        fetch(`http://localhost:8080/api/v1/artists/${id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.status === 204) {
                // alert("Delete artist successfully.");
                navigate("/danh-sach-nghe-si");
            } else {
                throw new Error("Failed to delete artist.");
            }
        }).catch(err => setError(err instanceof Error ? err.message : "Unknown error"));
    }

    useEffect(() => {
        if (isDelete) {
            fetch(`http://localhost:8080/api/v1/artists/${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Fail to fetch artist details.");
                    }
                    return res.json();
                })
                .then(data => {
                    setArtist(data)
                    onDelete(id);
                })
                .catch(() => {
                    setError(`Artist with id ${id} not found.`);
                });
        }
    }, [isDelete, id]);
    return (
        <Container>
            <h1>Delete Artist</h1>

            {error ?
                <>
                    <Alert variant={"danger"}>{error}</Alert>
                    <Button variant="secondary" as={Link} to={"danh-sach-nghe-si"}>Back to list</Button>
                </> :
                <>
                    <p>Are you sure to delete artist {artist.name} with ID: {artist.id}</p>
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                    <Button variant="outline-secondary" className={"ms-2"} as={Link} to={'/danh-sach-nghe-si'}>
                        Back to List
                    </Button>
                </>}
        </Container>
    )
}

export default ArtistDeleteForm;