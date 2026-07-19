package vn.edu.fpt.sba.recipebook.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.recipebook.dto.response.MealTypeResponse;
import vn.edu.fpt.sba.recipebook.service.MealTypeService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/meal-types")
public class MealTypeController {

    private final MealTypeService mealTypeService;

    @GetMapping
    public ResponseEntity<List<MealTypeResponse>> findAll() {
        return ResponseEntity.ok(mealTypeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealTypeResponse> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(mealTypeService.findById(id));
    }
}
