import { useLocation } from 'react-router-dom';
import { useGrid } from '../../context/GridContext';

const routeTitles = {
  '/': 'Grid Overview',
  '/map': 'Grid Map',
  '/nodes': 'Solar Nodes',
  '/batteries': 'Batteries',
  '/events': 'System Events',
  '/simulation': 'Simulation Control',
};

export default function Header() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || 'GridWeaver';
  const { connectionStatus } = useGrid();

  const isLive = connectionStatus === 'LIVE';

  return (
    <header className="h-16 bg-transparent border-b border-white/[0.04] flex items-center justify-between px-8 flex-shrink-0">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border ${isLive ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">{connectionStatus}</span>
        </div>
      </div>
    </header>
  );
}
