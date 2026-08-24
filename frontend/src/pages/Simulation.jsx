import { useState } from 'react';
import { Play, CloudLightning, Square, RotateCcw } from 'lucide-react';
import { useGrid } from '../context/GridContext';
import * as simulationService from '../services/simulationService';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Simulation() {
  const { simulationStatus, gridSummary, nodes, loading, error, refreshData } = useGrid();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  if (loading && !simulationStatus) return <Loading message="Loading simulation status..." />;
  if (error && !simulationStatus) return <ErrorMessage message="Backend Offline" onRetry={refreshData} />;

  const handleAction = async (actionFn) => {
    setActionLoading(true);
    setActionError(null);
    try {
      await actionFn();
      await refreshData();
    } catch (err) {
      setActionError(err.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const status = simulationStatus?.status || 'UNKNOWN';
  const mode = simulationStatus?.mode || 'NORMAL';
  const gridState = gridSummary?.status || 'UNKNOWN';

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">Simulation Control</h1>
      </div>
      
      {actionError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg">
          {actionError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Panel */}
        <div className="gw-card p-5 shadow-sm">
          <h3 className="gw-label mb-6">Current State</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Simulation Status</span>
              <span className={`font-medium ${status === 'RUNNING' ? 'text-emerald-400' : 'text-slate-300'}`}>{status}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Simulation Mode</span>
              <span className="font-medium text-slate-200">{mode}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Simulated Nodes</span>
              <span className="font-medium text-slate-200">{nodes.length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400">Grid State</span>
              <span className={`font-medium ${gridState === 'STABLE' ? 'text-emerald-400' : gridState === 'UNSTABLE' ? 'text-rose-500' : 'text-amber-400'}`}>{gridState}</span>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="gw-card p-5 shadow-sm">
          <h3 className="gw-label mb-4">Storm Scenario</h3>
          <div className="prose prose-invert prose-sm text-slate-300">
            <p>
              A sudden storm reduces solar generation across the grid. The backend detects grid instability and automatically triggers battery discharge to support grid recovery.
            </p>
            <p className="mt-4 text-slate-400">
              Click <strong>START STORM</strong> below to observe the real-time telemetry changes, battery state shifts, and eventual grid stabilization.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="gw-card p-5 shadow-sm">
        <h3 className="gw-label mb-6">Controls</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => handleAction(simulationService.startSimulation)}
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <Play className="w-5 h-5" />
            START SIMULATION
          </button>
          <button 
            onClick={() => handleAction(simulationService.triggerStorm)}
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <CloudLightning className="w-5 h-5" />
            START STORM
          </button>
          <button 
            onClick={() => handleAction(simulationService.stopSimulation)}
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <Square className="w-5 h-5" />
            STOP SIMULATION
          </button>
          <div className="flex-1 min-w-[20px]"></div>
          <button 
            onClick={() => handleAction(simulationService.stopSimulation)}
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 font-medium rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
