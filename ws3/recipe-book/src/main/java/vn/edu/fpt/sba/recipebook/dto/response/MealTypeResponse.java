package vn.edu.fpt.sba.recipebook.dto.response;

public record MealTypeResponse(
        Integer id,
        String name,
        String description,
        int recipeCount
) {
}
