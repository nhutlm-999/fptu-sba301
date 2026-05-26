package vn.edu.fpt.sba.dto;


import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class ArtistDto {
    @Size(min = 3, max = 255, message = "Name must be less than or equal to 255 characters")
    @Pattern(regexp = "^[a-zA-Z0-9 ]*$", message = "Name must not contain special characters")
    private String name;
}
