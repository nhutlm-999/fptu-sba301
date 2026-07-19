package vn.edu.fpt.sba.recipebook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 3, max = 100)
    @Column(nullable = false)
    private String name;

    @NotNull
    @Positive
    @Column(name = "prep_time", nullable = false)
    private Integer prepTime;

    @NotNull
    @Positive
    @Column(name = "cook_time", nullable = false)
    private Integer cookTime;

    @NotBlank
    @Column(nullable = false)
    private String difficulty;

    @NotNull
    @Positive
    @Column(nullable = false)
    private Integer servings;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_type_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "recipes"})
    @ToString.Exclude
    private MealType mealType;
}
