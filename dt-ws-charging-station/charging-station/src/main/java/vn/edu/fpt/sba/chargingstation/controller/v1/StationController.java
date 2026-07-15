package vn.edu.fpt.sba.chargingstation.controller.v1;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.chargingstation.dto.response.StationResponse;
import vn.edu.fpt.sba.chargingstation.service.StationService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stations")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@Tag(name = "Station", description = "Station management API")
public class StationController {

    private final StationService stationService;

    @GetMapping
    @Operation(summary = "Get all stations")
    public ResponseEntity<List<StationResponse>> getAll() {
        return ResponseEntity.ok(stationService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get station by ID")
    public ResponseEntity<StationResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(stationService.getById(id));
    }
}
