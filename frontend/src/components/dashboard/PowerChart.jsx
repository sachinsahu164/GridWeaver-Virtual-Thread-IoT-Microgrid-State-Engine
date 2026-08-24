import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { time: '10:00', generation: 400, demand: 320 },
  { time: '10:15', generation: 410, demand: 340 },
  { time: '10:30', generation: 430, demand: 360 },
  { time: '10:45', generation: 420, demand: 380 },
  { time: '11:00', generation: 440, demand: 385 },
  { time: '11:15', generation: 425, demand: 375 },
  { time: '11:30', generation: 415, demand: 390 },
  { time: '11:45', generation: 405, demand: 380 },
];

export default function PowerChart() {
  return (
    <div className="gw-card p-5 h-full flex flex-col">
      <h3 className="gw-label mb-6">Power Generation vs Demand</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '0.5rem' }}
              itemStyle={{ fontSize: '14px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '14px', color: '#cbd5e1' }} />
            <Area type="monotone" dataKey="generation" name="Generation (kW)" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorGeneration)" />
            <Area type="monotone" dataKey="demand" name="Demand (kW)" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorDemand)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
