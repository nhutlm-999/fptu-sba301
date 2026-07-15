package vn.edu.fpt.sba.chargingstation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.sba.chargingstation.entity.Station;

@Repository
public interface StationRepository extends JpaRepository<Station, Integer> {
}
