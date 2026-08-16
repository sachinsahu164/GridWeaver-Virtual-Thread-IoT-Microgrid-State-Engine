package com.gridweaver.gridweaver_engine.grid.controller;

import com.gridweaver.gridweaver_engine.grid.dto.GridSummaryResponse;
import com.gridweaver.gridweaver_engine.grid.service.GridService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grid")
@CrossOrigin(origins = "http://localhost:5173")
public class GridController {

    private final GridService gridService;

    public GridController(GridService gridService) {
        this.gridService = gridService;
    }

    @GetMapping("/summary")
    public ResponseEntity<GridSummaryResponse> getGridSummary() {

        return ResponseEntity.ok(
                gridService.getGridSummary()
        );
    }
}