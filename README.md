# ⚡ GridWeaver

### Real-Time Microgrid Monitoring & Automated Battery Response

GridWeaver is a **real-time microgrid monitoring and simulation platform** designed to demonstrate how modern Java systems can handle large volumes of concurrent energy-device telemetry and react to sudden grid disturbances.

The platform simulates a network of **solar nodes and home batteries**, processes their telemetry through **Java 21 Virtual Threads and Apache Kafka**, uses **Spring State Machine** to manage battery states, and provides a **React + Leaflet GIS dashboard** for live grid visualization.

> **Core idea:** When a sudden storm causes solar generation to drop, GridWeaver detects the grid instability and automatically triggers battery discharge to help stabilize the simulated grid.

---

## 🎯 Problem Statement

Modern decentralized energy grids can contain thousands of distributed devices such as:

* ☀️ Solar panels
* 🔋 Home batteries
* 🏠 Smart energy systems
* ⚡ Grid monitoring devices

These devices continuously generate telemetry.

A sudden event such as a storm can cause thousands of devices to report changes almost simultaneously.

Traditional thread-per-connection architectures can become expensive when handling massive numbers of concurrent connections.

**GridWeaver demonstrates a scalable event-driven approach using Java 21 Virtual Threads, Kafka, and state-based automation.**

---

# 💡 What GridWeaver Does

GridWeaver simulates a small city microgrid containing:

* Solar generation nodes
* Battery storage nodes
* Grid demand
* Real-time telemetry
* Grid stability states
* Automated battery responses

The dashboard allows an operator to monitor the simulated grid and trigger a **Storm Simulation**.

### Normal Condition

```text
Solar Generation > Grid Demand

        ↓

🟢 GRID STABLE
```

### Storm Condition

```text
Storm
  ↓
Solar Output Drops
  ↓
Grid Generation Decreases
  ↓
Grid Becomes Unstable
  ↓
Battery Discharge Triggered
  ↓
Grid Starts Recovering
  ↓
🟢 GRID STABLE
```

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │     React + Leaflet  │
                    │     GIS Dashboard    │
                    └──────────┬───────────┘
                               │
                         REST / WebSocket
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Spring Boot     │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          REST APIs       Simulation      WebSocket
                             Engine
                               │
                         Java 21 Virtual
                            Threads
                               │
                               ▼
                         ┌───────────┐
                         │   Kafka   │
                         │   Events  │
                         └─────┬─────┘
                               │
                               ▼
                     Telemetry Consumer
                               │
                               ▼
                       Grid Decision Engine
                               │
                               ▼
                     Spring State Machine
                               │
                               ▼
                       Battery Response
                               │
                               ▼
                         Real-Time Event
                               │
                               ▼
                         React Dashboard
```

---

# 🔄 End-to-End Workflow

## 1. Grid Initialization

The backend initializes a simulated energy network containing:

```text
100 Solar Nodes
50 Battery Nodes
```

Each node has simulated properties such as:

* Geographic coordinates
* Power output
* Voltage
* Status
* Battery charge level
* Current operating state

---

## 2. Telemetry Simulation

The backend continuously generates simulated telemetry.

Example:

```json
{
  "nodeId": "SOLAR-021",
  "powerOutput": 4.8,
  "status": "ACTIVE",
  "timestamp": "2026-08-23T10:30:00"
}
```

Java 21 Virtual Threads allow the simulation to model many concurrent device activities using lightweight threads.

---

## 3. Kafka Event Pipeline

Telemetry events are published to Kafka.

Example topics:

```text
solar-telemetry
battery-telemetry
battery-commands
```

Kafka acts as the event buffer between telemetry producers and backend consumers.

This allows the system to handle sudden telemetry spikes without tightly coupling ingestion and processing.

---

## 4. Grid Analysis

The backend continuously calculates the simulated grid condition.

Simplified model:

```text
Grid Balance = Total Generation - Total Demand
```

Example:

```text
Generation = 450 kW
Demand     = 380 kW

Balance = +70 kW

Status = STABLE
```

---

## 5. Storm Simulation

The operator can trigger:

```text
POST /api/simulation/storm
```

The simulation engine reduces the power output of solar nodes.

Example:

```text
Before Storm:

Solar Output = 450 kW

After Storm:

Solar Output = 120 kW
```

The resulting generation deficit causes the grid state to become unstable.

---

## 6. State Machine Response

Spring State Machine manages battery states:

```text
             ┌───────────┐
             │   IDLE    │
             └─────┬─────┘
                   │
          GRID_UNSTABLE
                   │
                   ▼
          ┌───────────────┐
          │ DISCHARGING   │
          └───────┬───────┘
                  │
            GRID_STABLE
                  │
                  ▼
                IDLE
```

Other supported states:

```text
IDLE
CHARGING
DISCHARGING
FAULT
```

When the grid becomes unstable, available batteries transition to:

```text
IDLE → DISCHARGING
```

---

# 🔋 Battery Response

The backend generates a simulated battery response.

Example:

```json
{
  "batteryId": "BAT-021",
  "state": "DISCHARGING",
  "powerOutput": 5.0
}
```

The state change is then propagated to the dashboard.

---

# 🗺️ Real-Time GIS Dashboard

The frontend uses **React and Leaflet** to visualize the simulated grid.

The map displays:

### ☀️ Solar Nodes

```text
🟢 Active
🟡 Warning
🔴 Fault
```

### 🔋 Battery Nodes

```text
🔵 Idle
🟣 Charging
⚡ Discharging
🔴 Fault
```

### Dashboard Metrics

The operator can monitor:

* Total solar nodes
* Active nodes
* Fault nodes
* Total generation
* Grid demand
* Grid balance
* Battery states
* Overall grid stability

---

# ⚡ Storm Demo

The primary demonstration flow is:

```text
                 NORMAL GRID
                     │
                     ▼
                🟢 STABLE
                     │
                     │
             [ SIMULATE STORM ]
                     │
                     ▼
               🌩️ STORM
                     │
                     ▼
          Solar Generation ↓
                     │
                     ▼
              Grid Deficit
                     │
                     ▼
             🔴 UNSTABLE
                     │
                     ▼
           State Machine Event
                     │
                     ▼
        Batteries → DISCHARGING
                     │
                     ▼
           Generation Support
                     │
                     ▼
              🟡 RECOVERING
                     │
                     ▼
                🟢 STABLE
                     │
                     ▼
          Batteries → IDLE
```

The complete process is visible on the live dashboard.

---

# 🧩 Key Modules

## 1. Virtual Thread Ingestion

**Technology:** Java 21 Virtual Threads

Responsible for simulating highly concurrent IoT telemetry processing.

```text
Simulated Devices
       ↓
Virtual Threads
       ↓
Telemetry Events
```

---

## 2. Event Broker

**Technology:** Apache Kafka

Responsible for:

* Buffering telemetry
* Decoupling producers and consumers
* Handling event spikes
* Transporting battery commands

---

## 3. Grid Decision Engine

Responsible for calculating:

```text
Generation
Demand
Grid Balance
Grid Stability
```

---

## 4. State Machine Engine

**Technology:** Spring State Machine

Controls battery lifecycle and transitions:

```text
IDLE
CHARGING
DISCHARGING
FAULT
```

---

## 5. Simulation Engine

Provides the demo environment.

It simulates:

* Solar power fluctuations
* Storm events
* Battery behavior
* Grid recovery

No physical solar panels or batteries are required.

---

## 6. GIS Dashboard

**Technology:** React + Leaflet

Provides:

* Geographic visualization
* Live node states
* Grid metrics
* Battery activity
* Storm simulation controls
* Real-time updates

---

# 🛠️ Technology Stack

### Backend

| Technology           | Purpose                            |
| -------------------- | ---------------------------------- |
| Java 21              | Core backend + Virtual Threads     |
| Spring Boot          | Backend framework                  |
| Spring State Machine | Battery state management           |
| Apache Kafka         | Event streaming                    |
| PostgreSQL           | Persistent node/configuration data |
| WebSocket            | Real-time dashboard updates        |
| Maven                | Build management                   |

### Frontend

| Technology | Purpose               |
| ---------- | --------------------- |
| React      | Dashboard UI          |
| Leaflet    | GIS map visualization |
| JavaScript | Frontend logic        |
| WebSocket  | Live updates          |

### Infrastructure

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| Docker         | Containerization            |
| Docker Compose | Local service orchestration |

---

# 🔌 Core APIs

The demo intentionally keeps the API surface small.

| Method | Endpoint                  | Purpose             |
| ------ | ------------------------- | ------------------- |
| GET    | `/api/dashboard/overview` | Dashboard metrics   |
| GET    | `/api/nodes`              | Solar node data     |
| GET    | `/api/batteries`          | Battery data        |
| GET    | `/api/grid/status`        | Current grid status |
| POST   | `/api/simulation/storm`   | Trigger storm       |
| POST   | `/api/simulation/reset`   | Reset simulation    |

### Real-Time Channel

```text
/ws/grid
```

Used to push:

* Grid updates
* Node updates
* Battery state changes
* Storm events
* Recovery events

---

# 🗄️ Data Model

The demo uses a lightweight data model.

### Solar Node

```text
SolarNode
 ├── id
 ├── latitude
 ├── longitude
 ├── powerOutput
 ├── voltage
 └── status
```

### Battery

```text
Battery
 ├── id
 ├── latitude
 ├── longitude
 ├── capacity
 ├── currentCharge
 └── state
```

The system does not persist every telemetry event because the project focuses on **real-time processing rather than historical analytics**.

---

# 📊 Simulation Scale

GridWeaver is a demonstration project, not a real utility-grid deployment.

The default simulation uses:

```text
☀️ Solar Nodes:     100
🔋 Batteries:        50
📡 Total Devices:   150
```

The architecture can additionally be load-tested with larger numbers of concurrent telemetry events to demonstrate the behavior of Java Virtual Threads and Kafka under event spikes.

---

# 🚫 What This Project Does NOT Simulate

To keep the project focused and practical, GridWeaver does not attempt to implement:

* Real solar hardware
* Real battery hardware
* Physical electrical grid control
* Complex electrical load-flow algorithms
* Machine-learning forecasting
* Real utility infrastructure
* Kubernetes-based deployment
* Microservice architecture
* Production authentication/authorization

The goal is to demonstrate the **software architecture and real-time event-processing workflow**.

---

# 🚀 Getting Started

## Prerequisites

Install:

```text
Java 21+
Maven
Docker
Docker Compose
Node.js
npm
```

---

## Backend

Clone the repository:

```bash
git clone <repository-url>
cd gridweaver
```

Start infrastructure:

```bash
docker compose up -d
```

Run the backend:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the application in the browser using the Vite development URL.

---

# 🧪 Demo Scenario

After starting the application:

### Step 1

Open the GridWeaver dashboard.

### Step 2

Observe the normal grid:

```text
🟢 STABLE
```

### Step 3

Monitor solar and battery nodes on the map.

### Step 4

Click:

```text
SIMULATE STORM
```

### Step 5

Observe:

```text
Solar Output ↓
       ↓
Grid Balance ↓
       ↓
Grid UNSTABLE
       ↓
Battery DISCHARGE
       ↓
Grid RECOVERY
       ↓
Grid STABLE
```

### Step 6

Watch the map and dashboard update in real time.

---

# 🎯 Project Goals

GridWeaver demonstrates five major engineering concepts:

### 1. High Concurrency

Using **Java 21 Virtual Threads** to model many concurrent device activities.

### 2. Event-Driven Architecture

Using **Apache Kafka** to transport and buffer telemetry events.

### 3. State-Based Automation

Using **Spring State Machine** to manage battery behavior.

### 4. Real-Time Communication

Using **WebSocket** to push backend changes to the dashboard.

### 5. Geospatial Visualization

Using **React + Leaflet** to visualize distributed energy nodes geographically.

---

# 🔥 Why GridWeaver?

Traditional monitoring dashboards mostly show data.

GridWeaver goes one step further:

```text
MONITOR
   ↓
DETECT
   ↓
DECIDE
   ↓
ACT
   ↓
VISUALIZE
```

The system doesn't just show that the grid is unstable.

It demonstrates an automated response:

```text
Grid Instability
       ↓
State Machine
       ↓
Battery Discharge
       ↓
Grid Recovery
```

---

# 📌 Future Improvements

Possible future extensions include:

* Real IoT device integration
* MQTT support
* Large-scale distributed simulation
* Advanced grid optimization
* Energy demand forecasting
* Historical telemetry analytics
* Authentication and role-based access
* Microservice deployment
* Kubernetes orchestration
* Cloud deployment
* Real-world GIS/grid datasets

---

# 👨‍💻 Project Status

**Status:** 🚧 Demo / Academic Project

GridWeaver is currently designed as a **controlled simulation environment** for demonstrating concurrent event processing, real-time state management, automated battery response, and GIS visualization.

---

# 📜 License

This project is intended for educational and demonstration purposes.
