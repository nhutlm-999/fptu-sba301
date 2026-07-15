package vn.edu.fpt.sba.chargingstation.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "slots")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(name = "slot_name", nullable = false)
    private String slotName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "slots"})
    @ToString.Exclude
    private Station station;

    @NotNull
    @Column(name = "max_power_kw", nullable = false)
    private Double maxPowerKw;

    @NotBlank
    @Column(name = "connector_standard", nullable = false)
    private String connectorStandard;

    @Column(name = "is_disabled", nullable = false)
    private Boolean isDisabled = false;
}
