package vn.edu.fpt.sba.recipebook.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.fpt.sba.recipebook.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    Page<Recipe> findByMealTypeId(Integer mealTypeId, Pageable pageable);

    Page<Recipe> findByDifficulty(String difficulty, Pageable pageable);

    Page<Recipe> findByNameContainingIgnoreCase(String search, Pageable pageable);

    @Query("SELECT r FROM Recipe r WHERE " +
           "(:mealTypeId IS NULL OR r.mealType.id = :mealTypeId) AND " +
           "(:difficulty IS NULL OR r.difficulty = :difficulty) AND " +
           "(:search IS NULL OR LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Recipe> findByFilters(@Param("mealTypeId") Integer mealTypeId,
                               @Param("difficulty") String difficulty,
                               @Param("search") String search,
                               Pageable pageable);
}
