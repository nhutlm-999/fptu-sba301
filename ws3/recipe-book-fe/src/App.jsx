
import './App.css'
import {Route, Routes} from "react-router-dom";
import RecipesListPage from "./pages/RecipesListPage.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import AddNewRecipe from "./pages/AddNewRecipe.jsx";
import DeleteRecipe from "./pages/DeleteRecipe.jsx";
import UpdateRecipe from "./pages/UpdateRecipe.jsx";
import UpdateRecipePage from "./pages/UpdateRecipe.jsx";

function App() {

  return (
    <Routes>
      <Route path={'/'} element={<RecipesListPage/>}></Route>
      <Route path={'/details/:id'} element={<RecipeDetails/>}/>
      <Route path={'/delete-recipe/:id'} element={<DeleteRecipe/>}/>
      <Route path={'/update-recipe/:id'} element={<UpdateRecipePage/>}/>
      <Route path={'/add-new-recipes'} element={<AddNewRecipe/>}/>



    </Routes>
  )
}

export default App
