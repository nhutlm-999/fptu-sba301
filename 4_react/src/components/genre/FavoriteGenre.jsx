import {Button, Card} from "react-bootstrap";
import {useState} from "react";


export const FavoriteGenre = () => {
    const [like, setLike] = useState(1);
    return (
        <Card>
            <Card.Body>
                <Card.Title>Genre</Card.Title>
                <Card.Subtitle>{like} likes</Card.Subtitle>
                <Card.Text>{"80 tracks"}</Card.Text>
                <Button onClick={() => {
                    setLike(like + 1)
                }}>Like
                </Button>

                <Button variant={"outline-secondary"} className={"ms-2"} onClick={() => {
                    setLike(0)
                }}>Reset</Button>
            </Card.Body>
        </Card>)
}

