package vn.edu.fpt.sba.recipebook.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import vn.edu.fpt.sba.recipebook.entity.MealType;
import vn.edu.fpt.sba.recipebook.entity.Recipe;
import vn.edu.fpt.sba.recipebook.repository.MealTypeRepository;

import java.util.List;

@RequiredArgsConstructor
@Component
@Profile("dev")
public class DataInitializer implements CommandLineRunner {

    private final MealTypeRepository mealTypeRepository;

    @Override
    public void run(String... args) {
        if (mealTypeRepository.count() > 0) {
            return;
        }

        MealType breakfast = new MealType(null, "Breakfast", "Morning meals to start your day", null);
        MealType lunch = new MealType(null, "Lunch", "Midday meals for a satisfying break", null);
        MealType dinner = new MealType(null, "Dinner", "Evening meals for a hearty finish", null);
        MealType dessert = new MealType(null, "Dessert", "Sweet treats to end a meal", null);

        mealTypeRepository.saveAll(List.of(breakfast, lunch, dinner, dessert));

        breakfast.setRecipes(List.of(
                createRecipe("Pancakes", 10, 15, "Easy", 4, breakfast),
                createRecipe("Omelette", 5, 10, "Easy", 2, breakfast),
                createRecipe("French Toast", 10, 12, "Medium", 3, breakfast)
        ));

        lunch.setRecipes(List.of(
                createRecipe("Pho Bo", 30, 120, "Medium", 4, lunch),
                createRecipe("Banh Mi", 15, 10, "Easy", 2, lunch),
                createRecipe("Ca Ri Ga", 20, 45, "Medium", 4, lunch)
        ));

        dinner.setRecipes(List.of(
                createRecipe("Grilled Salmon", 15, 25, "Hard", 2, dinner),
                createRecipe("Bo Kho", 30, 90, "Hard", 6, dinner),
                createRecipe("Stir-fried Noodles", 15, 10, "Easy", 3, dinner)
        ));

        dessert.setRecipes(List.of(
                createRecipe("Tiramisu", 30, 5, "Medium", 8, dessert),
                createRecipe("Che Ba Mau", 15, 20, "Easy", 4, dessert),
                createRecipe("Creme Brulee", 20, 45, "Hard", 4, dessert)
        ));

        mealTypeRepository.saveAll(List.of(breakfast, lunch, dinner, dessert));
    }

    private Recipe createRecipe(String name, int prepTime, int cookTime, String difficulty, int servings, MealType mealType) {
        Recipe recipe = new Recipe();
        recipe.setName(name);
        recipe.setPrepTime(prepTime);
        recipe.setCookTime(cookTime);
        recipe.setDifficulty(difficulty);
        recipe.setServings(servings);
        recipe.setMealType(mealType);
        return recipe;
    }
}
