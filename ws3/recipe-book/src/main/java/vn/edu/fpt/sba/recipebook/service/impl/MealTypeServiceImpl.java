package vn.edu.fpt.sba.recipebook.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.recipebook.dto.response.MealTypeResponse;
import vn.edu.fpt.sba.recipebook.entity.MealType;
import vn.edu.fpt.sba.recipebook.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.recipebook.repository.MealTypeRepository;
import vn.edu.fpt.sba.recipebook.service.MealTypeService;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MealTypeServiceImpl implements MealTypeService {

    private final MealTypeRepository mealTypeRepository;

    @Override
    public List<MealTypeResponse> findAll() {
        return mealTypeRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public MealTypeResponse findById(Integer id) {
        MealType mealType = mealTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MealType", id));
        return toResponse(mealType);
    }

    private MealTypeResponse toResponse(MealType mealType) {
        return new MealTypeResponse(
                mealType.getId(),
                mealType.getName(),
                mealType.getDescription(),
                mealType.getRecipes().size()
        );
    }
}
