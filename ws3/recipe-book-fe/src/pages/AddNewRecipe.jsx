import {Button, Card, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";
import {useNavigate} from "react-router-dom";

const AddNewRecipes = () => {
    const [recipeName, setRecipeName] = useState("");
    const [mealTypes, setMealTypes] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [difficulty, setDifficulty] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [servings, setServings] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosClient.post('/v1/recipes', {
                name: recipeName,
                prepTime: prepTime,
                cookTime: cookingTime,
                difficulty: selectedDifficulty,
                servings: servings,
                mealTypeId: selectedMealType
            });

            if (res.status == 201 ){
                navigate("/");
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchMealTypes = async () => {
            try {
                const resMealTypes = await axiosClient.get('/v1/meal-types');
                setMealTypes(resMealTypes.data || resMealTypes.content);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMealTypes()
    }, []);
    return (
        <Container>
            <h1>Add new Recipes</h1>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => setRecipeName(e.target.value)}>
                        <Form.Label>Recipe name</Form.Label>
                        <Form.Control required type="text" placeholder="e.g. grilled s"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Meal Type</Form.Label>
                        <Form.Select aria-label="Default select example" className="mb-3" onChange={(e) => setSelectedMealType(e.target.value)} required>
                            <option value={""}>-- Select meal type ---</option>
                            {mealTypes?.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <div className={"d-flex gap-5"}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e) => setPrepTime(e.target.value)} required>
                            <Form.Label>Prep time</Form.Label>
                            <Form.Control required type="text" placeholder={"e.g. 150"}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e) => setCookingTime(e.target.value)} required>
                            <Form.Label>Cooking time - mins</Form.Label>
                            <Form.Control required type="text" placeholder={"e.g. 150"}/>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Difficulty</Form.Label>
                        <Form.Select  aria-label="Default select example" className="mb-3" onChange={(e) => setSelectedDifficulty(e.target.value)} required>
                            <option value={""}>-- Select difficulty ---</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="difficulty">Difficulty</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e) => setServings(e.target.value)} required>
                        <Form.Label>Servings</Form.Label>
                        <Form.Control required type="text" placeholder={"e.g. 4"}/>
                    </Form.Group>

                    <div className="d-flex justify-content-end mt-3 gap-2">
                        <Button variant="outline-dark" type="button" onClick={() => navigate("/")}>Back</Button>
                        <Button type="submit" className="btn btn-success">Submit</Button>
                    </div>
                </Form>
            </Card>


        </Container>
    )
}
export default AddNewRecipes