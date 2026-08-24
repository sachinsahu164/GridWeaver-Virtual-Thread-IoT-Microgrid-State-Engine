import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map as MapIcon, Sun, Battery, Activity, PlayCircle } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Grid Map', href: '/map', icon: MapIcon },
  { name: 'Solar Nodes', href: '/nodes', icon: Sun },
  { name: 'Batteries', href: '/batteries', icon: Battery },
  { name: 'Events', href: '/events', icon: Activity },
  { name: 'Simulation', href: '/simulation', icon: PlayCircle },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-black/30 border-r border-white/[0.04] flex flex-col h-full flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-500" />
          GridWeaver
        </h1>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-slate-800 text-blue-400'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
