package vn.edu.fpt.sba.dto.request;

import jakarta.validation.constraints.Size;

public record ArtistRequestDto(@Size(min = 3, max = 20, message = "Artist name must be at least 3 characters") String name) {
}
