package vn.edu.fpt.sba.chargingstation.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.chargingstation.dto.request.SlotRequest;
import vn.edu.fpt.sba.chargingstation.dto.response.PagedResponse;
import vn.edu.fpt.sba.chargingstation.dto.response.SlotResponse;
import vn.edu.fpt.sba.chargingstation.entity.Slot;
import vn.edu.fpt.sba.chargingstation.entity.Station;
import vn.edu.fpt.sba.chargingstation.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.chargingstation.repository.SlotRepository;
import vn.edu.fpt.sba.chargingstation.repository.StationRepository;
import vn.edu.fpt.sba.chargingstation.service.SlotService;

@Service
@RequiredArgsConstructor
public class SlotServiceImpl implements SlotService {

    private final SlotRepository slotRepository;
    private final StationRepository stationRepository;

    @Override
    public PagedResponse<SlotResponse> search(Integer stationId, String slotName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (stationId != null && slotName != null) {
            if (!stationRepository.existsById(stationId)) {
                throw new ResourceNotFoundException("Station", stationId);
            }
            Page<Slot> slotPage = slotRepository.findByStationIdAndSlotNameContainingIgnoreCase(stationId, slotName, pageable);
            return toPagedResponse(slotPage);
        }

        if (stationId != null) {
            if (!stationRepository.existsById(stationId)) {
                throw new ResourceNotFoundException("Station", stationId);
            }
            Page<Slot> slotPage = slotRepository.findByStationId(stationId, pageable);
            return toPagedResponse(slotPage);
        }

        if (slotName != null) {
            Page<Slot> slotPage = slotRepository.findBySlotNameContainingIgnoreCase(slotName, pageable);
            return toPagedResponse(slotPage);
        }

        Page<Slot> slotPage = slotRepository.findAll(pageable);
        return toPagedResponse(slotPage);
    }

    @Override
    public SlotResponse getById(Integer id) {
        return toResponse(slotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Slot", id)));
    }

    @Override
    public SlotResponse create(SlotRequest request) {
        Station station = stationRepository.findById(request.stationId())
                .orElseThrow(() -> new ResourceNotFoundException("Station", request.stationId()));

        Slot slot = new Slot();
        slot.setSlotName(request.slotName());
        slot.setStation(station);
        slot.setMaxPowerKw(request.maxPowerKw());
        slot.setConnectorStandard(request.connectorStandard());
        slot.setIsDisabled(request.isDisabled() != null ? request.isDisabled() : false);

        return toResponse(slotRepository.save(slot));
    }

    @Override
    public SlotResponse update(Integer id, SlotRequest request) {
        Slot slot = slotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Slot", id));

        Station station = stationRepository.findById(request.stationId())
                .orElseThrow(() -> new ResourceNotFoundException("Station", request.stationId()));

        slot.setSlotName(request.slotName());
        slot.setStation(station);
        slot.setMaxPowerKw(request.maxPowerKw());
        slot.setConnectorStandard(request.connectorStandard());
        slot.setIsDisabled(request.isDisabled() != null ? request.isDisabled() : false);

        return toResponse(slotRepository.save(slot));
    }

    @Override
    public void delete(Integer id) {
        if (!slotRepository.existsById(id)) {
            throw new ResourceNotFoundException("Slot", id);
        }
        slotRepository.deleteById(id);
    }

    private PagedResponse<SlotResponse> toPagedResponse(Page<Slot> page) {
        return new PagedResponse<>(
                page.getContent().stream().map(this::toResponse).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    private SlotResponse toResponse(Slot slot) {
        return new SlotResponse(
                slot.getId(),
                slot.getSlotName(),
                new SlotResponse.StationRef(slot.getStation().getId(), slot.getStation().getLocation(), slot.getStation().getResponsible()),
                slot.getMaxPowerKw(),
                slot.getConnectorStandard(),
                slot.getIsDisabled()
        );
    }
}
