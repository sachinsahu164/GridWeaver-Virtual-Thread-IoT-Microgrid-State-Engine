import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

type StatusType = 'STABLE' | 'UNSTABLE' | 'RECOVERING';

interface GridStatusProps {
  status: StatusType;
  generation: number;
  demand: number;
  balance: number;
}

const statusConfig = {
  STABLE: {
    pill: 'gw-pill-stable',
    dot: 'gw-dot-stable',
    icon: ShieldCheck,
    label: 'GRID STABLE'
  },
  UNSTABLE: {
    pill: 'gw-pill-unstable',
    dot: 'gw-dot-unstable',
    icon: AlertTriangle,
    label: 'GRID UNSTABLE'
  },
  RECOVERING: {
    pill: 'gw-pill-recovering',
    dot: 'gw-dot-recovering',
    icon: Activity,
    label: 'RECOVERING'
  }
};

export default function GridStatus({ status, generation, demand, balance }: GridStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="gw-card p-5 flex flex-col h-full relative overflow-hidden">
      {/* Accent left border indicator */}
      
      
      <div className="flex items-center gap-4 mb-8">
        <div className={`px-4 py-2 rounded-full flex items-center gap-3 ${config.pill}`}>
          <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></div>
          <Icon className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wider uppercase">{config.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
        <div className="gw-card p-5">
          <div className="gw-label block mb-2">Generation</div>
          <div className="gw-value block">
            {generation} <span className="text-sm text-slate-500 font-normal">kW</span>
          </div>
        </div>
        <div className="gw-card p-5">
          <div className="gw-label block mb-2">Demand</div>
          <div className="gw-value block">
            {demand} <span className="text-sm text-slate-500 font-normal">kW</span>
          </div>
        </div>
        <div className="gw-card p-5">
          <div className="gw-label block mb-2">Balance</div>
          <div className={`gw-value block ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {balance > 0 ? '+' : ''}{balance} <span className="text-sm text-slate-500 font-normal">kW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
