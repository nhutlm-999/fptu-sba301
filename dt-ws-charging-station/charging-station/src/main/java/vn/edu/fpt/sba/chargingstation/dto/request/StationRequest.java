package vn.edu.fpt.sba.chargingstation.dto.request;

import jakarta.validation.constraints.NotBlank;

public record StationRequest(
        @NotBlank String location,
        @NotBlank String responsible
) {}
