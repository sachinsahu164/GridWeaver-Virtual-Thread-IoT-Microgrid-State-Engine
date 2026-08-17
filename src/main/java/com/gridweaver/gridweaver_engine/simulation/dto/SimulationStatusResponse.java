package com.gridweaver.gridweaver_engine.simulation.dto;

import com.gridweaver.gridweaver_engine.simulation.model.SimulationMode;

public record SimulationStatusResponse(

        boolean running,

        SimulationMode mode,

        long totalNodes,

        long warningNodes,

        long faultNodes,

        long totalBatteries,

        long dischargingBatteries,

        double totalSolarPower,

        double totalBatteryPower

) {
}