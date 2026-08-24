import { useState } from 'react';
import { Play, CloudLightning, Square, RotateCcw } from 'lucide-react';
import { useGrid } from '../../context/GridContext';
import * as simulationService from '../../services/simulationService';

export default function SimulationControl() {
  const { refreshData } = useGrid();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

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

  return (
    <div className="gw-card p-5 shadow-sm w-full h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
         <h3 className="gw-label">Controls</h3>
         {actionError && <span className="text-xs text-rose-500">{actionError}</span>}
      </div>
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => handleAction(simulationService.startSimulation)}
          disabled={actionLoading}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
        >
          <Play className="w-4 h-4" />
          START
        </button>
        <button 
          onClick={() => handleAction(simulationService.triggerStorm)}
          disabled={actionLoading}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
        >
          <CloudLightning className="w-4 h-4" />
          STORM
        </button>
        <button 
          onClick={() => handleAction(simulationService.stopSimulation)}
          disabled={actionLoading}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
        >
          <Square className="w-4 h-4" />
          STOP
        </button>
        <button 
          onClick={() => handleAction(simulationService.stopSimulation)}
          disabled={actionLoading}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 font-medium rounded-lg transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          RESET
        </button>
      </div>
    </div>
  );
}
