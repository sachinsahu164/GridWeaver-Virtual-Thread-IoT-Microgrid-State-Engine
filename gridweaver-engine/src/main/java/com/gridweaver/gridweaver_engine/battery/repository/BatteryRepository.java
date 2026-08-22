package com.gridweaver.gridweaver_engine.battery.repository;

import com.gridweaver.gridweaver_engine.battery.entity.Battery;
import com.gridweaver.gridweaver_engine.battery.entity.BatteryState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BatteryRepository extends JpaRepository<Battery, Long> {

    Optional<Battery> findByBatteryId(String batteryId);

    boolean existsByBatteryId(String batteryId);

    long countByState(BatteryState state);
}