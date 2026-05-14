package vn.edu.fpt.sba.dto.request;

import jakarta.validation.constraints.Size;

public record ArtistRequestDto(@Size(min = 3, max = 20) String name) {
}
