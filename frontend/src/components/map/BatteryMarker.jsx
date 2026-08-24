import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function BatteryMarker({ battery }) {
  const getStateColor = (state) => {
    switch(state) {
      case 'IDLE': return 'bg-slate-400';
      case 'CHARGING': return 'bg-blue-400';
      case 'DISCHARGING': return 'bg-amber-400';
      case 'FAULT': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const isDischarging = battery.state === 'DISCHARGING';

  const iconHtml = `
    <div class="w-6 h-6 rounded border-[3px] border-slate-900 ${getStateColor(battery.state)} flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] ${isDischarging ? 'animate-pulse' : ''}">
      <div class="w-2 h-1 bg-slate-900 rounded-sm opacity-60"></div>
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  return (
    <Marker position={[battery.lat, battery.lng]} icon={customIcon}>
      <Popup>
        <div className="p-1 min-w-[140px]">
          <h4 className="font-bold text-slate-100 border-b border-slate-700 pb-1 mb-2">{battery.id}</h4>
          <div className="space-y-1 text-sm">
            <p><span className="text-slate-400">State:</span> <span className={battery.state === 'DISCHARGING' ? 'text-amber-400 font-medium' : 'text-slate-200'}>{battery.state}</span></p>
            <p><span className="text-slate-400">Charge:</span> <span className="text-slate-200">{battery.charge}%</span></p>
            <p><span className="text-slate-400">Capacity:</span> <span className="text-slate-200">{battery.capacity || 13.5} kWh</span></p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
