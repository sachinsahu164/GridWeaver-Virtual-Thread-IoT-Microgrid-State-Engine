import GridMap from '../components/map/GridMap';
import '../styles/map.css';
import { useGrid } from '../context/GridContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function GridMapPage() {
  const { nodes, batteries, loading, error, refreshData } = useGrid();

  if (loading && nodes.length === 0) return <Loading message="Loading grid map..." />;
  if (error && nodes.length === 0) return <ErrorMessage message="Backend Offline" onRetry={refreshData} />;

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">Grid Map</h1>
      </div>
      
      <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-[600px]">
        {/* Main Map Container */}
        <div className="flex-1 rounded-xl relative shadow-sm">
          <GridMap nodes={nodes} batteries={batteries} />
        </div>

        {/* Legend Sidebar */}
        <div className="w-full xl:w-64 gw-card p-5 flex flex-col gap-6 shadow-sm flex-shrink-0">
          <div>
            <h3 className="gw-label mb-4">Solar Nodes</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-slate-900 bg-emerald-400 shadow-sm"></div>
                <span className="text-sm text-slate-300">Active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-slate-900 bg-amber-400 shadow-sm"></div>
                <span className="text-sm text-slate-300">Warning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-slate-900 bg-rose-500 shadow-sm"></div>
                <span className="text-sm text-slate-300">Fault</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h3 className="gw-label mb-4">Batteries</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-slate-900 bg-slate-400 shadow-sm"></div>
                <span className="text-sm text-slate-300">Idle</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-slate-900 bg-blue-400 shadow-sm"></div>
                <span className="text-sm text-slate-300">Charging</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-slate-900 bg-amber-400 shadow-sm animate-pulse"></div>
                <span className="text-sm text-slate-300 font-medium">Discharging</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-slate-900 bg-rose-500 shadow-sm"></div>
                <span className="text-sm text-slate-300">Fault</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
