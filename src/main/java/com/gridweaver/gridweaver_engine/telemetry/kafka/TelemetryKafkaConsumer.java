package com.gridweaver.gridweaver_engine.telemetry.kafka;

import com.gridweaver.gridweaver_engine.telemetry.dto.TelemetryRequest;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class TelemetryKafkaConsumer {

    @KafkaListener(
            topics = "grid.telemetry",
            groupId = "gridweaver-telemetry-group"
    )
    public void consumeTelemetry(
            TelemetryRequest telemetry
    ) {

        System.out.println();
        System.out.println("============================================");
        System.out.println("📥 TELEMETRY RECEIVED FROM KAFKA");
        System.out.println("============================================");

        System.out.println(
                "Node ID      : " +
                        telemetry.nodeId()
        );

        System.out.println(
                "Power Output : " +
                        telemetry.powerOutput() +
                        " kW"
        );

        System.out.println(
                "Voltage      : " +
                        telemetry.voltage() +
                        " V"
        );

        System.out.println(
                "Temperature  : " +
                        telemetry.temperature() +
                        " °C"
        );

        System.out.println("============================================");
        System.out.println();
    }
}