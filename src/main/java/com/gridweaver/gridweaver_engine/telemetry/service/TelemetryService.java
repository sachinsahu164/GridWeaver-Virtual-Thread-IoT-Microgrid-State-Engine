package com.gridweaver.gridweaver_engine.telemetry.service;

import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import com.gridweaver.gridweaver_engine.node.repository.SolarNodeRepository;
import com.gridweaver.gridweaver_engine.telemetry.dto.TelemetryBatchRequest;
import com.gridweaver.gridweaver_engine.telemetry.dto.TelemetryRequest;

import com.gridweaver.gridweaver_engine.telemetry.engin.VirtualThreadTelemetryProcessor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TelemetryService {

    private final SolarNodeRepository solarNodeRepository;

    private final VirtualThreadTelemetryProcessor
            telemetryProcessor;

    public TelemetryService(
            SolarNodeRepository solarNodeRepository,
            VirtualThreadTelemetryProcessor telemetryProcessor
    ) {

        this.solarNodeRepository =
                solarNodeRepository;

        this.telemetryProcessor =
                telemetryProcessor;
    }

    @Transactional
    public SolarNode processTelemetry(
            TelemetryRequest request
    ) {

        SolarNode node =
                solarNodeRepository
                        .findByNodeId(
                                request.nodeId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Solar node not found: "
                                                + request.nodeId()
                                )
                        );

        SolarNode processedNode =
                telemetryProcessor.process(
                        node,
                        request.powerOutput(),
                        request.voltage(),
                        request.temperature()
                );

        return solarNodeRepository.save(
                processedNode
        );
    }
    @Transactional
    public int processTelemetryBatch(
            TelemetryBatchRequest request
    ) {

        request.telemetry()
                .parallelStream()
                .forEach(
                        this::processTelemetry
                );

        return request.telemetry().size();
    }
}