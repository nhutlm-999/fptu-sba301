package vn.edu.fpt.sba.chargingstation.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.chargingstation.dto.response.StationResponse;
import vn.edu.fpt.sba.chargingstation.entity.Station;
import vn.edu.fpt.sba.chargingstation.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.chargingstation.repository.StationRepository;
import vn.edu.fpt.sba.chargingstation.service.StationService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StationServiceImpl implements StationService {

    private final StationRepository stationRepository;

    @Override
    public List<StationResponse> getAll() {
        return stationRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public StationResponse getById(Integer id) {
        return toResponse(stationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Station", id)));
    }

    private StationResponse toResponse(Station station) {
        return new StationResponse(station.getId(), station.getLocation(), station.getResponsible());
    }
}
