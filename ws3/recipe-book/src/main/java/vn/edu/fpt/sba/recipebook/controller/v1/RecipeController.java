package vn.edu.fpt.sba.recipebook.controller.v1;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.recipebook.dto.request.RecipeRequest;
import vn.edu.fpt.sba.recipebook.dto.response.PagedResponse;
import vn.edu.fpt.sba.recipebook.dto.response.RecipeResponse;
import vn.edu.fpt.sba.recipebook.service.RecipeService;

@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    public ResponseEntity<PagedResponse<RecipeResponse>> findAll(
            @RequestParam(required = false) Integer mealTypeId,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return ResponseEntity.ok(recipeService.findAll(mealTypeId, difficulty, search, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(recipeService.findById(id));
    }

    @PostMapping
    public ResponseEntity<RecipeResponse> create(@Valid @RequestBody RecipeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(recipeService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeResponse> update(@PathVariable Integer id, @Valid @RequestBody RecipeRequest request) {
        return ResponseEntity.ok(recipeService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        recipeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
