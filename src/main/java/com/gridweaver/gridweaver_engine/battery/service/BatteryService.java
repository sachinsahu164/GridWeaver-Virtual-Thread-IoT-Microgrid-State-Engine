package com.gridweaver.gridweaver_engine.battery.service;

import com.gridweaver.gridweaver_engine.battery.entity.Battery;
import com.gridweaver.gridweaver_engine.battery.repository.BatteryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatteryService {

    private final BatteryRepository batteryRepository;

    public BatteryService(BatteryRepository batteryRepository) {
        this.batteryRepository = batteryRepository;
    }

    public List<Battery> getAllBatteries() {
        return batteryRepository.findAll();
    }

    public Battery getBatteryByBatteryId(String batteryId) {

        return batteryRepository.findByBatteryId(batteryId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Battery not found: " + batteryId
                        )
                );
    }
}