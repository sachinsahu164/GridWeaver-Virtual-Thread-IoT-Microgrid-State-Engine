package com.gridweaver.gridweaver_engine.battery.controller;

import com.gridweaver.gridweaver_engine.battery.entity.Battery;
import com.gridweaver.gridweaver_engine.battery.service.BatteryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batteries")
@CrossOrigin(origins = "http://localhost:5173")
public class BatteryController {

    private final BatteryService batteryService;

    public BatteryController(BatteryService batteryService) {
        this.batteryService = batteryService;
    }

    @GetMapping
    public ResponseEntity<List<Battery>> getAllBatteries() {

        return ResponseEntity.ok(
                batteryService.getAllBatteries()
        );
    }

    @GetMapping("/{batteryId}")
    public ResponseEntity<Battery> getBatteryById(
            @PathVariable String batteryId
    ) {

        return ResponseEntity.ok(
                batteryService.getBatteryByBatteryId(batteryId)
        );
    }
}