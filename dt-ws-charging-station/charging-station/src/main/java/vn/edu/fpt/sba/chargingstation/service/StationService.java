package vn.edu.fpt.sba.chargingstation.service;

import vn.edu.fpt.sba.chargingstation.dto.response.StationResponse;

import java.util.List;

public interface StationService {
    List<StationResponse> getAll();

    StationResponse getById(Integer id);
}
