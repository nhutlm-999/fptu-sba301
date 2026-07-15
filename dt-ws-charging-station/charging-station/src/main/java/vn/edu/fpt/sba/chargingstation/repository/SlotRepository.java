package vn.edu.fpt.sba.chargingstation.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.sba.chargingstation.entity.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer> {
    Page<Slot> findByStationId(Integer stationId, Pageable pageable);

    Page<Slot> findBySlotNameContainingIgnoreCase(String slotName, Pageable pageable);

    Page<Slot> findByStationIdAndSlotNameContainingIgnoreCase(Integer stationId, String slotName, Pageable pageable);
}
