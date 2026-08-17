package com.gridweaver.gridweaver_engine.simulation.engine;

import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Component
public class VirtualThreadSimulationEngine {

    public List<SolarNode> processNodes(
            List<SolarNode> nodes
    ) {

        try (ExecutorService executor =
                     Executors.newVirtualThreadPerTaskExecutor()) {

            List<Future<SolarNode>> futures =
                    new ArrayList<>();

            for (SolarNode node : nodes) {

                Future<SolarNode> future =
                        executor.submit(
                                () -> processNode(node)
                        );

                futures.add(future);
            }

            List<SolarNode> processedNodes =
                    new ArrayList<>();

            for (Future<SolarNode> future : futures) {

                processedNodes.add(
                        future.get()
                );
            }

            return processedNodes;

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Virtual thread node processing failed.",
                    exception
            );
        }
    }

    private SolarNode processNode(
            SolarNode node
    ) {

        /*
         * Simulating lightweight IoT telemetry processing.
         *
         * In the real system this could represent:
         *
         * - telemetry validation
         * - sensor processing
         * - power calculation
         * - event generation
         * - state evaluation
         */

        double currentPower =
                node.getPowerOutput();

        double adjustedPower =
                Math.max(
                        0.0,
                        currentPower
                );

        node.setPowerOutput(
                adjustedPower
        );

        return node;
    }
}