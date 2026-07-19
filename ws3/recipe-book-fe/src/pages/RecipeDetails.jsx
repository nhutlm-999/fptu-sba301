import { Badge, Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosClient from "../axios/axiosClient.js";

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Dùng để quay lại trang trước
    const [recipe, setRecipe] = useState(null);
    const [mealType, setMealType] = useState(null);

    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const res = await axiosClient.get(`/v1/recipes/${id}`);
                setRecipe(res.data);
                setMealType(res.data.mealType); // Lấy thông tin mealType từ recipe
            } catch (error) {
                console.log(error);
            }
        };
        fetchSlot();
    }, [id]);

    if (!recipe) {
        return (
            <Container className="mt-4" style={{ maxWidth: "600px" }}>
                <p>Loading slot details...</p>
            </Container>
        );
    }

    // Custom CSS để màu sắc giống hình mẫu
    const styles = {
        card: {
            borderRadius: "20px",
            border: "none",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
            padding: "20px",
            backgroundColor: "#fff"
        },
        cardTitle: {
            color: "#1e293b",
            fontWeight: "700",
            fontSize: "24px",
            borderBottom: "1px solid #f1f5f9",
            paddingBottom: "15px",
            marginBottom: "20px"
        },
        sectionHeader: {
            fontSize: "12px",
            fontWeight: "700",
            color: "#94a3b8",
            letterSpacing: "0.5px",
            marginTop: "20px",
            marginBottom: "15px",
            textTransform: "uppercase"
        },
        rowItem: {
            borderBottom: "1px solid #f1f5f9",
            paddingTop: "10px",
            paddingBottom: "10px",
            fontSize: "15px"
        },
        label: {
            color: "#475569",
            fontWeight: "500"
        },
        value: {
            color: "#1e293b",
            fontWeight: "500"
        },
        badge: {
            backgroundColor: "#d1fae5",
            color: "#065f46",
            fontWeight: "600",
            padding: "5px 10px",
            borderRadius: "6px"
        },
        btnBack: {
            backgroundColor: "#5c677d",
            border: "none",
            padding: "8px 20px",
            borderRadius: "8px",
            fontWeight: "500"
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "650px" }}>
            <Card style={styles.card}>
                <Card.Body className="p-2">
                    <div style={styles.cardTitle}>Recipe details</div>

                    <div style={styles.sectionHeader}>Recipe information</div>

                    <Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>ID</Col>
                        <Col xs={7} style={styles.value}>{recipe.id}</Col>
                    </Row>
                    <Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>Name</Col>
                        <Col xs={7} style={styles.value}>{recipe.name}</Col>
                    </Row>
                    <Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>Prep time</Col>
                        <Col xs={7} style={styles.value}>{recipe.prepTime}</Col>
                    </Row>
                    <Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>Cook time</Col>
                        <Col xs={7} style={styles.value}>{recipe.cookTime}</Col>
                    </Row><Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>Total time</Col>
                        <Col xs={7} style={styles.value}>{recipe.cookTime + recipe.prepTime}</Col>
                    </Row><Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>Difficulty</Col>
                        <Col xs={7} style={styles.value}>{recipe.difficulty}</Col>
                    </Row><Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>Servings</Col>
                        <Col xs={7} style={styles.value}>{recipe.servings}</Col>
                    </Row>


                    <div style={styles.sectionHeader}>Meal type information</div>

                    <Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>ID</Col>
                        <Col xs={7} style={styles.value}>{mealType.id || "N/A"}</Col>
                    </Row>
                    <Row style={styles.rowItem}>
                        <Col xs={5} style={styles.label}>Name</Col>
                        <Col xs={7} style={styles.value}>{mealType.name}</Col>
                    </Row>
                    <Row style={styles.rowItem} className="border-0">
                        <Col xs={5} style={styles.label}>Description</Col>
                        <Col xs={7} style={styles.value}>{mealType.description}</Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            style={styles.btnBack}
                            onClick={() => navigate("/")}
                        >
                            Back
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RecipeDetail;