package vn.edu.fpt.sba.recipebook.service;

import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.recipebook.dto.request.RecipeRequest;
import vn.edu.fpt.sba.recipebook.dto.response.PagedResponse;
import vn.edu.fpt.sba.recipebook.dto.response.RecipeResponse;

public interface RecipeService {

    PagedResponse<RecipeResponse> findAll(Integer mealTypeId, String difficulty, String search, Pageable pageable);

    RecipeResponse findById(Integer id);

    RecipeResponse create(RecipeRequest request);

    RecipeResponse update(Integer id, RecipeRequest request);

    void delete(Integer id);
}
