package vn.edu.fpt.sba.recipebook.dto.response;

public record RecipeResponse(
        Integer id,
        String name,
        Integer prepTime,
        Integer cookTime,
        Integer totalTime,
        String difficulty,
        Integer servings,
        MealTypeRef mealType
) {
    public record MealTypeRef(Integer id, String name, String description) {
    }
}
