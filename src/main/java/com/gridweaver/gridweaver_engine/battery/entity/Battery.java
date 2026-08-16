package com.gridweaver.gridweaver_engine.battery.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "batteries")
public class Battery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "battery_id", nullable = false, unique = true, length = 50)
    private String batteryId;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Double capacity;

    @Column(name = "current_charge", nullable = false)
    private Double currentCharge;

    @Column(name = "power_output", nullable = false)
    private Double powerOutput;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BatteryState state;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Battery() {
    }

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getBatteryId() {
        return batteryId;
    }

    public void setBatteryId(String batteryId) {
        this.batteryId = batteryId;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getCapacity() {
        return capacity;
    }

    public void setCapacity(Double capacity) {
        this.capacity = capacity;
    }

    public Double getCurrentCharge() {
        return currentCharge;
    }

    public void setCurrentCharge(Double currentCharge) {
        this.currentCharge = currentCharge;
    }

    public Double getPowerOutput() {
        return powerOutput;
    }

    public void setPowerOutput(Double powerOutput) {
        this.powerOutput = powerOutput;
    }

    public BatteryState getState() {
        return state;
    }

    public void setState(BatteryState state) {
        this.state = state;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}