package com.gridweaver.gridweaver_engine.node.service;

import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import com.gridweaver.gridweaver_engine.node.repository.SolarNodeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolarNodeService {

    private final SolarNodeRepository solarNodeRepository;

    public SolarNodeService(SolarNodeRepository solarNodeRepository) {
        this.solarNodeRepository = solarNodeRepository;
    }

    public List<SolarNode> getAllNodes() {
        return solarNodeRepository.findAll();
    }

    public SolarNode getNodeByNodeId(String nodeId) {
        return solarNodeRepository.findByNodeId(nodeId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Solar node not found: " + nodeId
                        )
                );
    }
}