package vn.edu.fpt.sba.recipebook.service;

import vn.edu.fpt.sba.recipebook.dto.response.MealTypeResponse;

import java.util.List;

public interface MealTypeService {

    List<MealTypeResponse> findAll();

    MealTypeResponse findById(Integer id);
}
