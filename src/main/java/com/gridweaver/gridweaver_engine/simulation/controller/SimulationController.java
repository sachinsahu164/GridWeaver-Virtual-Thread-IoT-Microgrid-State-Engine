package com.gridweaver.gridweaver_engine.simulation.controller;

import com.gridweaver.gridweaver_engine.simulation.dto.SimulationResultResponse;
import com.gridweaver.gridweaver_engine.simulation.dto.SimulationStatusResponse;
import com.gridweaver.gridweaver_engine.simulation.service.SimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulation")
@CrossOrigin(origins = "http://localhost:5173")
public class SimulationController {

    private final SimulationService simulationService;

    public SimulationController(
            SimulationService simulationService
    ) {
        this.simulationService = simulationService;
    }

    @PostMapping("/start")
    public ResponseEntity<SimulationStatusResponse> startSimulation() {

        return ResponseEntity.ok(
                simulationService.startSimulation()
        );
    }

    @PostMapping("/storm")
    public ResponseEntity<SimulationResultResponse> simulateStorm() {

        return ResponseEntity.ok(
                simulationService.simulateStorm()
        );
    }

    @PostMapping("/stop")
    public ResponseEntity<SimulationStatusResponse> stopSimulation() {

        return ResponseEntity.ok(
                simulationService.stopSimulation()
        );
    }

    @GetMapping("/status")
    public ResponseEntity<SimulationStatusResponse> getStatus() {

        return ResponseEntity.ok(
                simulationService.getStatus()
        );
    }
}