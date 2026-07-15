package vn.edu.fpt.sba.chargingstation.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import vn.edu.fpt.sba.chargingstation.entity.Slot;
import vn.edu.fpt.sba.chargingstation.entity.Station;
import vn.edu.fpt.sba.chargingstation.repository.StationRepository;

import java.util.List;

@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final StationRepository stationRepository;

    @Override
    public void run(String... args) {
        if (stationRepository.count() > 0) {
            log.info("Data already exists, skipping seed");
            return;
        }

        log.info("Seeding initial data...");

        Station station1 = new Station();
        station1.setLocation("FPT University Cantho - Nguyen Van Cu");
        station1.setResponsible("Nguyen Van Chung");

        Station station2 = new Station();
        station2.setLocation("Lotte Mart Mau Than");
        station2.setResponsible("My Tam");


        Station station3 = new Station();
        station3.setLocation("Vincom Xuan Khanh");
        station3.setResponsible("Tran Thi Tu");

        Station station4 = new Station();
        station4.setLocation("Cho Noi Cai Rang");
        station4.setResponsible("Nguyen Thi My Linh");

        Slot s1S01 = new Slot();
        s1S01.setSlotName("S01");
        s1S01.setStation(station1);
        s1S01.setMaxPowerKw(150.0);
        s1S01.setConnectorStandard("CCS2");

        Slot s1F02 = new Slot();
        s1F02.setSlotName("F02");
        s1F02.setStation(station1);
        s1F02.setMaxPowerKw(150.0);
        s1F02.setConnectorStandard("CCS2");

        Slot s1SF03 = new Slot();
        s1SF03.setSlotName("SF03");
        s1SF03.setStation(station1);
        s1SF03.setMaxPowerKw(50.0);
        s1SF03.setConnectorStandard("CHAdeMO");
        s1SF03.setIsDisabled(true);

        station1.setSlots(List.of(s1S01, s1F02, s1SF03));

        Slot s2S01 = new Slot();
        s2S01.setSlotName("S01");
        s2S01.setStation(station2);
        s2S01.setMaxPowerKw(100.0);
        s2S01.setConnectorStandard("Type 2");

        Slot s2S02 = new Slot();
        s2S02.setSlotName("S02");
        s2S02.setStation(station2);
        s2S02.setMaxPowerKw(100.0);
        s2S02.setConnectorStandard("Type 2");

        Slot s2S03 = new Slot();
        s2S03.setSlotName("S03");
        s2S03.setStation(station2);
        s2S03.setMaxPowerKw(100.0);
        s2S03.setConnectorStandard("Type 2");

        Slot s2S04 = new Slot();
        s2S04.setSlotName("S04");
        s2S04.setStation(station2);
        s2S04.setMaxPowerKw(150.0);
        s2S04.setConnectorStandard("CCS2");

        Slot s2S05 = new Slot();
        s2S05.setSlotName("S05");
        s2S05.setStation(station2);
        s2S05.setMaxPowerKw(50.0);
        s2S05.setConnectorStandard("CHAdeMO");
        s2S05.setIsDisabled(true);

        station2.setSlots(List.of(s2S01, s2S02, s2S03, s2S04, s2S05));


        Slot s3S01 = new Slot();
        s3S01.setSlotName("S01");
        s3S01.setStation(station3);
        s3S01.setMaxPowerKw(100.0);
        s3S01.setConnectorStandard("Type 2");

        Slot s3SF02 = new Slot();
        s3SF02.setSlotName("SF02");
        s3SF02.setStation(station3);
        s3SF02.setMaxPowerKw(200.0);
        s3SF02.setConnectorStandard("CCS2");

        Slot s3S03 = new Slot();
        s3S03.setSlotName("S03");
        s3S03.setStation(station3);
        s3S03.setMaxPowerKw(100.0);
        s3S03.setConnectorStandard("CHAdeMO");

        station3.setSlots(List.of(s3S01, s3SF02, s3S03));

        Slot s4F01 = new Slot();
        s4F01.setSlotName("F01");
        s4F01.setStation(station4);
        s4F01.setMaxPowerKw(100.0);
        s4F01.setConnectorStandard("Type 2");

        Slot s4F02 = new Slot();
        s4F02.setSlotName("F02");
        s4F02.setStation(station4);
        s4F02.setMaxPowerKw(150.0);
        s4F02.setConnectorStandard("CCS2");

        Slot s4S03 = new Slot();
        s4S03.setSlotName("S03");
        s4S03.setStation(station4);
        s4S03.setMaxPowerKw(100.0);
        s4S03.setConnectorStandard("CHAdeMO");

        Slot s4S04 = new Slot();
        s4S04.setSlotName("S04");
        s4S04.setStation(station4);
        s4S04.setMaxPowerKw(100.0);
        s4S04.setConnectorStandard("Type 2");

        Slot s4S05 = new Slot();
        s4S05.setSlotName("S05");
        s4S05.setStation(station4);
        s4S05.setMaxPowerKw(150.0);
        s4S05.setConnectorStandard("CCS2");

        station4.setSlots(List.of(s4F01, s4F02, s4S03, s4S04, s4S05));

        stationRepository.saveAll(List.of(station1, station2));

        log.info("Seeded {} stations with slots", 2);
    }
}
