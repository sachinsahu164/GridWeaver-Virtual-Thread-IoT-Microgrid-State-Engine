package com.gridweaver.gridweaver_engine.telemetry.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record TelemetryRequest(

        @NotBlank(message = "Node ID is required")
        String nodeId,

        @NotNull(message = "Power output is required")
        @PositiveOrZero(message = "Power output cannot be negative")
        Double powerOutput,

        @NotNull(message = "Voltage is required")
        @PositiveOrZero(message = "Voltage cannot be negative")
        Double voltage,

        @NotNull(message = "Temperature is required")
        Double temperature
) {
}