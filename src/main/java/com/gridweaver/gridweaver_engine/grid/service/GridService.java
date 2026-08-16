package com.gridweaver.gridweaver_engine.grid.service;

import com.gridweaver.gridweaver_engine.battery.entity.BatteryState;
import com.gridweaver.gridweaver_engine.battery.repository.BatteryRepository;
import com.gridweaver.gridweaver_engine.grid.dto.GridSummaryResponse;
import com.gridweaver.gridweaver_engine.node.entity.NodeStatus;
import com.gridweaver.gridweaver_engine.node.repository.SolarNodeRepository;
import org.springframework.stereotype.Service;

@Service
public class GridService {

    private final SolarNodeRepository solarNodeRepository;
    private final BatteryRepository batteryRepository;

    public GridService(
            SolarNodeRepository solarNodeRepository,
            BatteryRepository batteryRepository
    ) {
        this.solarNodeRepository = solarNodeRepository;
        this.batteryRepository = batteryRepository;
    }

    public GridSummaryResponse getGridSummary() {

        long totalSolarNodes =
                solarNodeRepository.count();

        long activeNodes =
                solarNodeRepository.countByStatus(NodeStatus.ACTIVE);

        long warningNodes =
                solarNodeRepository.countByStatus(NodeStatus.WARNING);

        long faultNodes =
                solarNodeRepository.countByStatus(NodeStatus.FAULT);

        long offlineNodes =
                solarNodeRepository.countByStatus(NodeStatus.OFFLINE);

        long totalBatteries =
                batteryRepository.count();

        long chargingBatteries =
                batteryRepository.countByState(BatteryState.CHARGING);

        long dischargingBatteries =
                batteryRepository.countByState(BatteryState.DISCHARGING);

        long idleBatteries =
                batteryRepository.countByState(BatteryState.IDLE);

        long faultBatteries =
                batteryRepository.countByState(BatteryState.FAULT);

        return new GridSummaryResponse(

                totalSolarNodes,
                activeNodes,
                warningNodes,
                faultNodes,
                offlineNodes,

                totalBatteries,
                chargingBatteries,
                dischargingBatteries,
                idleBatteries,
                faultBatteries
        );
    }
}