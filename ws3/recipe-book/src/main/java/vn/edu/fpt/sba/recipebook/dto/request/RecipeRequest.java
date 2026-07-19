package vn.edu.fpt.sba.recipebook.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record RecipeRequest(
        @NotBlank @Size(min = 3, max = 100) String name,
        @NotNull @Positive Integer prepTime,
        @NotNull @Positive Integer cookTime,
        @NotBlank String difficulty,
        @NotNull @Positive Integer servings,
        @NotNull Integer mealTypeId
) {
}
