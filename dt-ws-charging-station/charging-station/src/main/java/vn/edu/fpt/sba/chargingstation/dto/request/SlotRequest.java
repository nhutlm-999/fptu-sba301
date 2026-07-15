package vn.edu.fpt.sba.chargingstation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SlotRequest(
        @NotBlank String slotName,
        @NotNull Integer stationId,
        @NotNull @Positive Double maxPowerKw,
        @NotBlank String connectorStandard,
        Boolean isDisabled
) {}
