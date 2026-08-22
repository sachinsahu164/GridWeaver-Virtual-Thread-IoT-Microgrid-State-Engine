package com.gridweaver.gridweaver_engine.telemetry.kafka;

import com.gridweaver.gridweaver_engine.config.KafkaTopicConfig;
import com.gridweaver.gridweaver_engine.telemetry.dto.TelemetryRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class TelemetryKafkaProducer {

    private final KafkaTemplate<String, TelemetryRequest>
            kafkaTemplate;

    public TelemetryKafkaProducer(
            KafkaTemplate<String, TelemetryRequest>
                    kafkaTemplate
    ) {

        this.kafkaTemplate =
                kafkaTemplate;
    }

    public void publish(
            TelemetryRequest telemetry
    ) {

        kafkaTemplate.send(
                KafkaTopicConfig.TELEMETRY_TOPIC,
                telemetry.nodeId(),
                telemetry
        );
    }
}