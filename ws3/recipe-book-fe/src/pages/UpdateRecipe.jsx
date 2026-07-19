import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios/axiosClient.js";

const UpdateRecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        prepTime: 0,
        cookTime: 0,
        difficulty: "easy",
        servings: 0,
        mealTypeId: ""
    });

    const [mealTypes, setMealTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [resRecipe, resMealTypes] = await Promise.all([
                    axiosClient.get(`/v1/recipes/${id}`),
                    axiosClient.get('/v1/meal-types')
                ]);

                // Đổ dữ liệu cũ vào form
                const recipeData = resRecipe.data || resRecipe;
                setFormData({
                    name: recipeData.name || "",
                    prepTime: recipeData.prepTime || 0,
                    cookTime: recipeData.cookTime || 0,
                    difficulty: recipeData.difficulty || "easy",
                    servings: recipeData.servings || 0,
                    mealTypeId: recipeData.mealType?.id || ""
                });

                setMealTypes(resMealTypes.data || resMealTypes.content || []);
            } catch (err) {
                console.error(err);
                setError("Failed to load recipe details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id]);

    // Handler thay đổi giá trị trong ô input
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Chuyển đổi giá trị sang kiểu số (number) đối với các trường thời gian/phần ăn/id loại bữa ăn
        const parsedValue = ["prepTime", "cookTime", "servings", "mealTypeId"].includes(name)
            ? (value === "" ? "" : Number(value))
            : value;

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    // 2. Xử lý submit form gửi lên API BE (PUT method)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // URL BE: http://localhost:8080/api/v1/recipes/:id
            const res = await axiosClient.put(`/v1/recipes/${id}`, formData);

            // Nếu update thành công, điều hướng về lại trang danh sách
            if (res.status === 200 || res.status === 204 || res.data) {
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to update recipe. Please check your inputs.");
        }
    };

    if (loading) {
        return (
            <Container className="mt-5" style={{ maxWidth: "650px" }}>
                <p className="text-muted text-center">Loading recipe details...</p>
            </Container>
        );
    }

    return (
        <Container className="my-5" style={{ maxWidth: "700px" }}>
            {/* Tiêu đề chính */}
            <h2 className="text-dark fw-bold mb-4">Update Recipe</h2>

            {error && <Alert variant="danger" className="border-0 rounded-3">{error}</Alert>}

            <Card className="border-0 shadow-sm p-3" style={{ borderRadius: "20px" }}>
                <Card.Body className="p-2">
                    <Form onSubmit={handleSubmit}>

                        {/* Recipe Name */}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-secondary fw-medium fs-6">Recipe Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter recipe name"
                                className="py-2 border-light-subtle"
                                style={{ borderRadius: "8px" }}
                                required
                            />
                        </Form.Group>

                        <Row>
                            {/* Prep Time */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-secondary fw-medium fs-6">Prep Time (minutes)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="prepTime"
                                        value={formData.prepTime}
                                        onChange={handleChange}
                                        min="0"
                                        className="py-2 border-light-subtle"
                                        style={{ borderRadius: "8px" }}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {/* Cook Time */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-secondary fw-medium fs-6">Cook Time (minutes)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cookTime"
                                        value={formData.cookTime}
                                        onChange={handleChange}
                                        min="0"
                                        className="py-2 border-light-subtle"
                                        style={{ borderRadius: "8px" }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            {/* Difficulty */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-secondary fw-medium fs-6">Difficulty</Form.Label>
                                    <Form.Select
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        className="py-2 text-dark border-light-subtle"
                                        style={{ borderRadius: "8px" }}
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            {/* Servings */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-secondary fw-medium fs-6">Servings</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="servings"
                                        value={formData.servings}
                                        onChange={handleChange}
                                        min="1"
                                        className="py-2 border-light-subtle"
                                        style={{ borderRadius: "8px" }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Meal Type Select */}
                        <Form.Group className="mb-4">
                            <Form.Label className="text-secondary fw-medium fs-6">Meal Type</Form.Label>
                            <Form.Select
                                name="mealTypeId"
                                value={formData.mealTypeId}
                                onChange={handleChange}
                                className="py-2 text-dark border-light-subtle"
                                style={{ borderRadius: "8px" }}
                                required
                            >
                                <option value="">Select a meal type</option>
                                {mealTypes?.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Nhóm nút hành động hành vi chuẩn */}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="secondary"
                                type="button"
                                className="px-4 py-2 border-0 fw-medium"
                                style={{ backgroundColor: "#5c677d", borderRadius: "8px" }}
                                onClick={() => navigate(-1)} // Quay lại trang trước đó
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                type="submit"
                                className="px-4 py-2 border-0 fw-medium"
                                style={{ borderRadius: "8px", backgroundColor: "#059669" }}
                            >
                                Save Changes
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdateRecipePage;