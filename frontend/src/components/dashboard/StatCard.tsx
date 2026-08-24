import type { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  statusColor?: 'emerald' | 'amber' | 'rose' | 'slate' | 'blue';
}

interface StatCardProps {
  title: string;
  mainValue: string | number;
  icon?: LucideIcon;
  items?: StatItem[];
}

const colorMap = {
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  rose: 'text-rose-400',
  slate: 'text-slate-400',
  blue: 'text-blue-400',
};

export default function StatCard({ title, mainValue, icon: Icon, items }: StatCardProps) {
  return (
    <div className="gw-card p-5 flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gw-label">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-slate-500" />}
      </div>
      
      <div className="gw-value mb-5 block">
        {mainValue}
      </div>
      
      {items && items.length > 0 && (
        <div className="mt-auto space-y-2 pt-4 border-t border-slate-800/50">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-slate-400">{item.label}</span>
              <span className={`font-medium ${item.statusColor ? colorMap[item.statusColor] : 'text-slate-200'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
