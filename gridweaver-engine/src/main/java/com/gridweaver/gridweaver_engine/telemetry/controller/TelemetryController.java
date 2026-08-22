package com.gridweaver.gridweaver_engine.telemetry.controller;

import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import com.gridweaver.gridweaver_engine.telemetry.dto.TelemetryBatchRequest;
import com.gridweaver.gridweaver_engine.telemetry.dto.TelemetryRequest;
import com.gridweaver.gridweaver_engine.telemetry.service.TelemetryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/telemetry")
@CrossOrigin(origins = "*")
public class TelemetryController {

    private final TelemetryService telemetryService;

    public TelemetryController(
            TelemetryService telemetryService
    ) {

        this.telemetryService =
                telemetryService;
    }

    @PostMapping
    public ResponseEntity<SolarNode> receiveTelemetry(
            @Valid @RequestBody TelemetryRequest request
    ) {

        SolarNode updatedNode =
                telemetryService.processTelemetry(
                        request
                );

        return ResponseEntity.ok(
                updatedNode
        );
    }

    @PostMapping("/batch")
    public ResponseEntity<String> receiveTelemetryBatch(
            @Valid @RequestBody TelemetryBatchRequest request
    ) {

        int processed =
                telemetryService
                        .processTelemetryBatch(
                                request
                        );

        return ResponseEntity.ok(
                processed
                        + " telemetry records processed successfully."
        );
    }
}