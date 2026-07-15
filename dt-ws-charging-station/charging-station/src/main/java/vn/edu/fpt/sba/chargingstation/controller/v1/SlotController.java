package vn.edu.fpt.sba.chargingstation.controller.v1;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.chargingstation.dto.request.SlotRequest;
import vn.edu.fpt.sba.chargingstation.dto.response.PagedResponse;
import vn.edu.fpt.sba.chargingstation.dto.response.SlotResponse;
import vn.edu.fpt.sba.chargingstation.service.SlotService;

@RestController
@RequestMapping("/api/v1/slots")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@Tag(name = "Slot", description = "Charging slot management API")
public class SlotController {

    private final SlotService slotService;

    @GetMapping
    @Operation(summary = "Get all slots (paginated), optionally filter by stationId or slotName")
    public ResponseEntity<PagedResponse<SlotResponse>> getAll(
            @RequestParam(required = false) Integer stationId,
            @RequestParam(required = false) String slotName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(slotService.search(stationId, slotName, page, size));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get slot by ID")
    public ResponseEntity<SlotResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(slotService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new slot")
    public ResponseEntity<SlotResponse> create(@Valid @RequestBody SlotRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(slotService.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing slot")
    public ResponseEntity<SlotResponse> update(@PathVariable Integer id, @Valid @RequestBody SlotRequest request) {
        return ResponseEntity.ok(slotService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a slot")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        slotService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
