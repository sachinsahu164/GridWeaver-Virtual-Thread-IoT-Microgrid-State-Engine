package com.gridweaver.gridweaver_engine.config;



import com.gridweaver.gridweaver_engine.battery.entity.Battery;
import com.gridweaver.gridweaver_engine.battery.entity.BatteryState;
import com.gridweaver.gridweaver_engine.battery.repository.BatteryRepository;
import com.gridweaver.gridweaver_engine.node.entity.NodeStatus;

import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import com.gridweaver.gridweaver_engine.node.repository.SolarNodeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
public class DataSeeder {

    private static final int SOLAR_NODE_COUNT = 100;
    private static final int BATTERY_COUNT = 50;

    private final SolarNodeRepository solarNodeRepository;
    private final BatteryRepository batteryRepository;

    private final Random random = new Random(42);

    public DataSeeder(
            SolarNodeRepository solarNodeRepository,
            BatteryRepository batteryRepository
    ) {
        this.solarNodeRepository = solarNodeRepository;
        this.batteryRepository = batteryRepository;
    }

    @Bean
    CommandLineRunner seedDatabase() {
        return args -> {

            seedSolarNodes();
            seedBatteries();

            System.out.println("--------------------------------------------");
            System.out.println("GridWeaver database initialization completed.");
            System.out.println("Solar Nodes : " + solarNodeRepository.count());
            System.out.println("Batteries   : " + batteryRepository.count());
            System.out.println("--------------------------------------------");
        };
    }

    private void seedSolarNodes() {

        if (solarNodeRepository.count() > 0) {
            System.out.println("Solar nodes already exist. Skipping solar node seeding.");
            return;
        }

        List<SolarNode> nodes = new ArrayList<>();

        for (int i = 1; i <= SOLAR_NODE_COUNT; i++) {

            SolarNode node = new SolarNode();

            node.setNodeId(String.format("SOLAR-%03d", i));

            node.setLatitude(
                    22.70 + (random.nextDouble() * 0.05)
            );

            node.setLongitude(
                    75.82 + (random.nextDouble() * 0.05)
            );

            node.setPowerOutput(
                    randomDouble(2.0, 6.0)
            );

            node.setVoltage(
                    randomDouble(220.0, 240.0)
            );

            node.setTemperature(
                    randomDouble(25.0, 45.0)
            );

            node.setStatus(NodeStatus.ACTIVE);

            nodes.add(node);
        }

        solarNodeRepository.saveAll(nodes);

        System.out.println(
                SOLAR_NODE_COUNT + " solar nodes inserted successfully."
        );
    }

    private void seedBatteries() {

        if (batteryRepository.count() > 0) {
            System.out.println("Batteries already exist. Skipping battery seeding.");
            return;
        }

        List<Battery> batteries = new ArrayList<>();

        for (int i = 1; i <= BATTERY_COUNT; i++) {

            Battery battery = new Battery();

            battery.setBatteryId(
                    String.format("BAT-%03d", i)
            );

            battery.setLatitude(
                    22.70 + (random.nextDouble() * 0.05)
            );

            battery.setLongitude(
                    75.82 + (random.nextDouble() * 0.05)
            );

            double capacity = randomDouble(5.0, 15.0);

            battery.setCapacity(capacity);

            battery.setCurrentCharge(
                    randomDouble(
                            capacity * 0.40,
                            capacity * 0.95
                    )
            );

            battery.setPowerOutput(0.0);

            battery.setState(BatteryState.IDLE);

            batteries.add(battery);
        }

        batteryRepository.saveAll(batteries);

        System.out.println(
                BATTERY_COUNT + " batteries inserted successfully."
        );
    }

    private double randomDouble(double min, double max) {
        return min + (random.nextDouble() * (max - min));
    }
}