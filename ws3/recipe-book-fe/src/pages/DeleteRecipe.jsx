import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";
import {useNavigate, useParams} from "react-router-dom";

const DeleteRecipe = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const res = await axiosClient.get(`/v1/recipes/${id}`);
                setRecipe(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSlot();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosClient.delete(`/v1/recipes/${id}`);
            if (res.status === 204) {
                navigate("/")
            }
        } catch (e){
            console.error(e);
        }
    }
    return (
        <Container>
            <Card className={"mt-4"} style={{maxWidth: "800px"}}>
                <Card.Body>
                    <Card.Title>Delete Slots</Card.Title>
                    <Alert variant={"warning"} className={"my-4"}>Warning: This action can not be undone</Alert>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                Recipe name
                            </Col>
                            <Col>
                                {recipe?.name}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Meal type
                            </Col>
                            <Col>
                                {recipe?.mealType?.name}
                            </Col>
                        </Row>

                        <div className={'d-flex justify-content-end gap-3 my-3'}>
                            <Button variant={'outline-dark'} onClick={() => navigate("/")}>Back</Button>
                            <Button variant={"danger"} type={"submit"}>Delete</Button>
                        </div>
                    </Form>



                </Card.Body>
            </Card>
        </Container>
    )
}
export default DeleteRecipe;