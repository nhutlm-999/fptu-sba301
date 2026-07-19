import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Car Parking Management</Card.Title>
                <Card.Text>Manage your parking lot efficiently</Card.Text>
                <Button as={Link} to={"/parkings"} variant={"outline-success"}>View Parkings</Button>
                <Button as={Link} to={"/checkin"} variant={"primary"}>Check In</Button>
            </Card.Body>
        </Card>
    )
}
export default Home;