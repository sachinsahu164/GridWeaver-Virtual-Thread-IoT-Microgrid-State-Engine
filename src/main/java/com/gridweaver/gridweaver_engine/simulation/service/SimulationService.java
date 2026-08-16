package com.gridweaver.gridweaver_engine.simulation.service;

import com.gridweaver.gridweaver_engine.battery.entity.Battery;
import com.gridweaver.gridweaver_engine.battery.entity.BatteryState;
import com.gridweaver.gridweaver_engine.battery.repository.BatteryRepository;
import com.gridweaver.gridweaver_engine.node.entity.NodeStatus;
import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import com.gridweaver.gridweaver_engine.node.repository.SolarNodeRepository;
import com.gridweaver.gridweaver_engine.simulation.dto.SimulationResultResponse;
import com.gridweaver.gridweaver_engine.simulation.dto.SimulationStatusResponse;
import com.gridweaver.gridweaver_engine.simulation.model.SimulationMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class SimulationService {

    private final SolarNodeRepository solarNodeRepository;
    private final BatteryRepository batteryRepository;

    private volatile boolean running = false;

    private volatile SimulationMode mode = SimulationMode.STOPPED;

    public SimulationService(
            SolarNodeRepository solarNodeRepository,
            BatteryRepository batteryRepository
    ) {
        this.solarNodeRepository = solarNodeRepository;
        this.batteryRepository = batteryRepository;
    }

    @Transactional
    public synchronized SimulationStatusResponse startSimulation() {

        running = true;
        mode = SimulationMode.NORMAL;

        List<SolarNode> nodes = solarNodeRepository.findAll();
        List<Battery> batteries = batteryRepository.findAll();

        for (SolarNode node : nodes) {

            double currentPower = node.getPowerOutput();

            double variation =
                    ThreadLocalRandom.current().nextDouble(-0.5, 0.5);

            double newPower =
                    Math.max(0.0, currentPower + variation);

            node.setPowerOutput(newPower);

            node.setTemperature(
                    ThreadLocalRandom.current().nextDouble(25.0, 45.0)
            );

            node.setVoltage(
                    ThreadLocalRandom.current().nextDouble(220.0, 240.0)
            );

            node.setStatus(NodeStatus.ACTIVE);
        }

        for (Battery battery : batteries) {

            battery.setState(BatteryState.IDLE);

            battery.setPowerOutput(0.0);
        }

        solarNodeRepository.saveAll(nodes);
        batteryRepository.saveAll(batteries);

        return buildStatus();
    }

    @Transactional
    public synchronized SimulationResultResponse simulateStorm() {

        running = true;
        mode = SimulationMode.STORM;

        List<SolarNode> nodes = solarNodeRepository.findAll();
        List<Battery> batteries = batteryRepository.findAll();

        double totalPowerBefore =
                calculateTotalSolarPower(nodes);

        long affectedNodes = 0;

        for (SolarNode node : nodes) {

            double currentPower = node.getPowerOutput();

            double stormPower =
                    currentPower *
                            ThreadLocalRandom.current()
                                    .nextDouble(0.25, 0.50);

            node.setPowerOutput(stormPower);

            node.setStatus(NodeStatus.WARNING);

            node.setTemperature(
                    ThreadLocalRandom.current().nextDouble(30.0, 50.0)
            );

            affectedNodes++;
        }

        long dischargingBatteries = 0;
        double totalBatteryPower = 0.0;

        for (Battery battery : batteries) {

            if (battery.getCurrentCharge() > 0) {

                battery.setState(BatteryState.DISCHARGING);

                double dischargePower =
                        ThreadLocalRandom.current()
                                .nextDouble(1.0, 3.0);

                battery.setPowerOutput(dischargePower);

                double newCharge =
                        Math.max(
                                0.0,
                                battery.getCurrentCharge()
                                        - (dischargePower * 0.05)
                        );

                battery.setCurrentCharge(newCharge);

                totalBatteryPower += dischargePower;

                dischargingBatteries++;
            }
        }

        solarNodeRepository.saveAll(nodes);
        batteryRepository.saveAll(batteries);

        double totalPowerAfter =
                calculateTotalSolarPower(nodes);

        return new SimulationResultResponse(

                "STORM",

                "Storm simulation completed successfully.",

                affectedNodes,

                dischargingBatteries,

                round(totalPowerBefore),

                round(totalPowerAfter),

                round(totalBatteryPower)
        );
    }

    @Transactional
    public synchronized SimulationStatusResponse stopSimulation() {

        running = false;
        mode = SimulationMode.STOPPED;

        List<Battery> batteries = batteryRepository.findAll();

        for (Battery battery : batteries) {

            battery.setState(BatteryState.IDLE);
            battery.setPowerOutput(0.0);
        }

        batteryRepository.saveAll(batteries);

        return buildStatus();
    }

    @Transactional(readOnly = true)
    public SimulationStatusResponse getStatus() {

        return buildStatus();
    }

    private SimulationStatusResponse buildStatus() {

        List<SolarNode> nodes =
                solarNodeRepository.findAll();

        List<Battery> batteries =
                batteryRepository.findAll();

        long warningNodes = nodes.stream()
                .filter(node ->
                        node.getStatus() == NodeStatus.WARNING)
                .count();

        long faultNodes = nodes.stream()
                .filter(node ->
                        node.getStatus() == NodeStatus.FAULT)
                .count();

        long dischargingBatteries = batteries.stream()
                .filter(battery ->
                        battery.getState() == BatteryState.DISCHARGING)
                .count();

        double totalSolarPower =
                calculateTotalSolarPower(nodes);

        double totalBatteryPower =
                batteries.stream()
                        .mapToDouble(Battery::getPowerOutput)
                        .sum();

        return new SimulationStatusResponse(

                running,

                mode,

                nodes.size(),

                warningNodes,

                faultNodes,

                batteries.size(),

                dischargingBatteries,

                round(totalSolarPower),

                round(totalBatteryPower)
        );
    }

    private double calculateTotalSolarPower(
            List<SolarNode> nodes
    ) {

        return nodes.stream()
                .mapToDouble(SolarNode::getPowerOutput)
                .sum();
    }

    private double round(double value) {

        return Math.round(value * 100.0) / 100.0;
    }
}