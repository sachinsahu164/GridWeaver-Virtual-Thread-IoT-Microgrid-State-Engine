package com.gridweaver.gridweaver_engine.telemetry.engin;

import com.gridweaver.gridweaver_engine.node.entity.NodeStatus;
import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import org.springframework.stereotype.Component;

import java.util.concurrent.Callable;

@Component
public class VirtualThreadTelemetryProcessor {

    public SolarNode process(
            SolarNode node,
            double powerOutput,
            double voltage,
            double temperature
    ) {

        return processUsingVirtualThread(
                () -> {

                    /*
                     * Simulating IoT telemetry processing.
                     *
                     * In the real GridWeaver system this layer
                     * can perform:
                     *
                     * - telemetry validation
                     * - sensor normalization
                     * - power calculations
                     * - threshold checking
                     * - state evaluation
                     */

                    node.setPowerOutput(
                            Math.max(0.0, powerOutput)
                    );

                    node.setVoltage(
                            Math.max(0.0, voltage)
                    );

                    node.setTemperature(
                            temperature
                    );

                    /*
                     * Simple demo rule.
                     *
                     * High temperature indicates
                     * possible node instability.
                     */

                    if (temperature >= 50.0) {

                        node.setStatus(
                                NodeStatus.WARNING
                        );

                    } else {

                        node.setStatus(
                                NodeStatus.ACTIVE
                        );
                    }

                    return node;
                }
        );
    }

    private SolarNode processUsingVirtualThread(
            Callable<SolarNode> task
    ) {

        try (
                var executor =
                        java.util.concurrent.Executors
                                .newVirtualThreadPerTaskExecutor()
        ) {

            var future =
                    executor.submit(task);

            return future.get();

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Telemetry processing failed",
                    exception
            );
        }
    }
}