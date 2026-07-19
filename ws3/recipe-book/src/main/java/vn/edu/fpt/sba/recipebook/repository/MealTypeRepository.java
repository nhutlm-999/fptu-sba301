package vn.edu.fpt.sba.recipebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fpt.sba.recipebook.entity.MealType;

public interface MealTypeRepository extends JpaRepository<MealType, Integer> {
}
