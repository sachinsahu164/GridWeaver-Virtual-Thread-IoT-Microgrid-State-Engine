package com.gridweaver.gridweaver_engine.node.repository;

import com.gridweaver.gridweaver_engine.node.entity.NodeStatus;
import com.gridweaver.gridweaver_engine.node.entity.SolarNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SolarNodeRepository extends JpaRepository<SolarNode, Long> {

    Optional<SolarNode> findByNodeId(String nodeId);

    boolean existsByNodeId(String nodeId);

    long countByStatus(NodeStatus status);
}