import { AlertTriangle, Activity, Battery, CheckCircle, Zap } from 'lucide-react';
import { useGrid } from '../../context/GridContext';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'CheckCircle': return CheckCircle;
    case 'Activity': return Activity;
    case 'Zap': return Zap;
    case 'Battery': return Battery;
    case 'AlertTriangle': return AlertTriangle;
    default: return Activity;
  }
};

export default function EventList() {
  const { events } = useGrid();

  return (
    <div className="gw-card p-5 h-full flex flex-col overflow-hidden shadow-sm">
      <h3 className="gw-label mb-6">Recent Events</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {events && events.length > 0 ? (
          events.map((event) => {
            const Icon = getIcon(event.icon);
            return (
              <div key={event.id} className="flex items-start gap-4 pb-4 border-b border-slate-800/60 last:border-0 last:pb-0">
                <div className="mt-1">
                  <Icon className={`w-5 h-5 ${event.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">{event.title}</p>
                  <span className="text-xs text-slate-500">{event.time}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-slate-500 text-sm h-full flex items-center justify-center">No recent events</div>
        )}
      </div>
    </div>
  );
}
