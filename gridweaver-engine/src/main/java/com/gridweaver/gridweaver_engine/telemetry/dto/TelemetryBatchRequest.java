package com.gridweaver.gridweaver_engine.telemetry.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record TelemetryBatchRequest(

        @NotEmpty(message = "Telemetry list cannot be empty")
        List<@Valid TelemetryRequest> telemetry
) {
}