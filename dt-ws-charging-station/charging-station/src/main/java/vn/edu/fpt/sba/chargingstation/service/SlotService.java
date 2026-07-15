package vn.edu.fpt.sba.chargingstation.service;

import vn.edu.fpt.sba.chargingstation.dto.request.SlotRequest;
import vn.edu.fpt.sba.chargingstation.dto.response.PagedResponse;
import vn.edu.fpt.sba.chargingstation.dto.response.SlotResponse;

public interface SlotService {
    PagedResponse<SlotResponse> search(Integer stationId, String slotName, int page, int size);

    SlotResponse getById(Integer id);

    SlotResponse create(SlotRequest request);

    SlotResponse update(Integer id, SlotRequest request);

    void delete(Integer id);
}
