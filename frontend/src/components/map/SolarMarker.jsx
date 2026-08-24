import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function SolarMarker({ node }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return 'bg-emerald-400';
      case 'WARNING': return 'bg-amber-400';
      case 'FAULT': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const iconHtml = `
    <div class="w-6 h-6 rounded-full border-[3px] border-slate-900 ${getStatusColor(node.status)} flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
      <div class="w-1.5 h-1.5 bg-slate-900 rounded-full opacity-60"></div>
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
    <Marker position={[node.lat, node.lng]} icon={customIcon}>
      <Popup>
        <div className="p-1 min-w-[140px]">
          <h4 className="font-bold text-slate-100 border-b border-slate-700 pb-1 mb-2">{node.id}</h4>
          <div className="space-y-1 text-sm">
            <p><span className="text-slate-400">Status:</span> <span className={node.status === 'ACTIVE' ? 'text-emerald-400' : 'text-amber-400'}>{node.status}</span></p>
            <p><span className="text-slate-400">Power:</span> <span className="text-slate-200">{node.power} kW</span></p>
            <p><span className="text-slate-400">Voltage:</span> <span className="text-slate-200">{node.voltage} V</span></p>
            <p><span className="text-slate-400">Temp:</span> <span className="text-slate-200">{node.temperature || 38.2}°C</span></p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
