package com.gridweaver.gridweaver_engine.node.controller;

import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import com.gridweaver.gridweaver_engine.node.service.SolarNodeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nodes")
@CrossOrigin(origins = "http://localhost:5173")
public class SolarNodeController {

    private final SolarNodeService solarNodeService;

    public SolarNodeController(SolarNodeService solarNodeService) {
        this.solarNodeService = solarNodeService;
    }

    @GetMapping
    public ResponseEntity<List<SolarNode>> getAllNodes() {

        return ResponseEntity.ok(
                solarNodeService.getAllNodes()
        );
    }

    @GetMapping("/{nodeId}")
    public ResponseEntity<SolarNode> getNodeById(
            @PathVariable String nodeId
    ) {

        return ResponseEntity.ok(
                solarNodeService.getNodeByNodeId(nodeId)
        );
    }
}