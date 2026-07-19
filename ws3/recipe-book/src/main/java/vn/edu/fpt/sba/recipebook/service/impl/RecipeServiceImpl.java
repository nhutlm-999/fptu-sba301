package vn.edu.fpt.sba.recipebook.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.fpt.sba.recipebook.dto.request.RecipeRequest;
import vn.edu.fpt.sba.recipebook.dto.response.PagedResponse;
import vn.edu.fpt.sba.recipebook.dto.response.RecipeResponse;
import vn.edu.fpt.sba.recipebook.entity.MealType;
import vn.edu.fpt.sba.recipebook.entity.Recipe;
import vn.edu.fpt.sba.recipebook.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.recipebook.repository.MealTypeRepository;
import vn.edu.fpt.sba.recipebook.repository.RecipeRepository;
import vn.edu.fpt.sba.recipebook.service.RecipeService;

@RequiredArgsConstructor
@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final MealTypeRepository mealTypeRepository;

    @Override
    public PagedResponse<RecipeResponse> findAll(Integer mealTypeId, String difficulty, String search, Pageable pageable) {
        Page<Recipe> recipePage = recipeRepository.findByFilters(mealTypeId, difficulty, search, pageable);
        return PagedResponse.from(recipePage.map(this::toResponse));
    }

    @Override
    public RecipeResponse findById(Integer id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", id));
        return toResponse(recipe);
    }

    @Override
    @Transactional
    public RecipeResponse create(RecipeRequest request) {
        MealType mealType = mealTypeRepository.findById(request.mealTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("MealType", request.mealTypeId()));

        Recipe recipe = new Recipe();
        recipe.setName(request.name());
        recipe.setPrepTime(request.prepTime());
        recipe.setCookTime(request.cookTime());
        recipe.setDifficulty(request.difficulty());
        recipe.setServings(request.servings());
        recipe.setMealType(mealType);

        Recipe saved = recipeRepository.save(recipe);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public RecipeResponse update(Integer id, RecipeRequest request) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", id));

        MealType mealType = mealTypeRepository.findById(request.mealTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("MealType", request.mealTypeId()));

        recipe.setName(request.name());
        recipe.setPrepTime(request.prepTime());
        recipe.setCookTime(request.cookTime());
        recipe.setDifficulty(request.difficulty());
        recipe.setServings(request.servings());
        recipe.setMealType(mealType);

        Recipe saved = recipeRepository.save(recipe);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        if (!recipeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recipe", id);
        }
        recipeRepository.deleteById(id);
    }

    private RecipeResponse toResponse(Recipe recipe) {
        return new RecipeResponse(
                recipe.getId(),
                recipe.getName(),
                recipe.getPrepTime(),
                recipe.getCookTime(),
                recipe.getPrepTime() + recipe.getCookTime(),
                recipe.getDifficulty(),
                recipe.getServings(),
                new RecipeResponse.MealTypeRef(
                        recipe.getMealType().getId(),
                        recipe.getMealType().getName(),
                        recipe.getMealType().getDescription()
                )
        );
    }
}
