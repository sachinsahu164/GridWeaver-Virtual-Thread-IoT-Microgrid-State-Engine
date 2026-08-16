package com.gridweaver.gridweaver_engine.grid.dto;

public record GridSummaryResponse(

        long totalSolarNodes,

        long activeNodes,

        long warningNodes,

        long faultNodes,

        long offlineNodes,

        long totalBatteries,

        long chargingBatteries,

        long dischargingBatteries,

        long idleBatteries,

        long faultBatteries

) {
}