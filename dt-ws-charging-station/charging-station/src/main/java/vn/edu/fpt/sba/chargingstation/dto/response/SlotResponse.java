package vn.edu.fpt.sba.chargingstation.dto.response;

public record SlotResponse(
        Integer id,
        String slotName,
        StationRef station,
        Double maxPowerKw,
        String connectorStandard,
        Boolean isDisabled
) {
    public record StationRef(Integer id, String location, String responsible) {}
}
