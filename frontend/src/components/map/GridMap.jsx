import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SolarMarker from './SolarMarker';
import BatteryMarker from './BatteryMarker';

export default function GridMap({ nodes = [], batteries = [] }) {
  // Center roughly based on first node or default to India coordinates
  const defaultCenter = nodes.length > 0 && nodes[0].latitude 
    ? [nodes[0].latitude, nodes[0].longitude] 
    : [22.9, 78.2];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 relative z-0" style={{ isolation: 'isolate' }}>
      <MapContainer 
        center={[22.9, 78.2]} 
        zoom={5} 
        style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {nodes.map(node => (
          node.latitude && node.longitude ? 
          <SolarMarker key={node.id || node.nodeId} node={{...node, lat: node.latitude, lng: node.longitude}} /> : null
        ))}
        {batteries.map(bat => (
          bat.latitude && bat.longitude ? 
          <BatteryMarker key={bat.id || bat.batteryId} battery={{...bat, lat: bat.latitude, lng: bat.longitude}} /> : null
        ))}
      </MapContainer>
    </div>
  );
}
