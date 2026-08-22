package com.gridweaver.gridweaver_engine.simulation.dto;

public record SimulationResultResponse(

        String event,

        String message,

        long affectedSolarNodes,

        long dischargingBatteries,

        double totalSolarPowerBefore,

        double totalSolarPowerAfter,

        double totalBatteryPower

) {
}