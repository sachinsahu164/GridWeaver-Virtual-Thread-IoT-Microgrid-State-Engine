import StatCard from '../components/dashboard/StatCard';
import GridStatus from '../components/dashboard/GridStatus';
import PowerChart from '../components/dashboard/PowerChart';
import EventList from '../components/dashboard/EventList';
import SimulationControl from '../components/dashboard/SimulationControl';
import { Sun, Battery, Zap, Activity } from 'lucide-react';
import { useGrid } from '../context/GridContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Dashboard() {
  const { gridSummary, nodes, batteries, loading, error, refreshData } = useGrid();

  if (loading && !gridSummary) return <Loading message="Loading grid data..." />;
  if (error && !gridSummary) return <ErrorMessage message="Backend Offline" onRetry={refreshData} />;

  const activeNodes = nodes.filter(n => n.status === 'ACTIVE').length;
  const warningNodes = nodes.filter(n => n.status === 'WARNING').length;
  const faultNodes = nodes.filter(n => n.status === 'FAULT').length;

  const chargingBats = batteries.filter(b => b.state === 'CHARGING').length;
  const dischargingBats = batteries.filter(b => b.state === 'DISCHARGING').length;
  const idleBats = batteries.filter(b => b.state === 'IDLE').length;

  const generation = gridSummary?.generation || 0;
  const demand = gridSummary?.demand || 0;
  const status = gridSummary?.status || 'STABLE';
  const balance = gridSummary?.balance || (generation - demand);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">Dashboard</h1>
      </div>
      
      {/* 4 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard 
          title="Solar Nodes" 
          mainValue={nodes.length} 
          icon={Sun}
          items={[
            { label: 'Active', value: activeNodes, statusColor: 'emerald' },
            { label: 'Warning', value: warningNodes, statusColor: 'amber' },
            { label: 'Fault', value: faultNodes, statusColor: 'slate' },
          ]}
        />
        <StatCard 
          title="Batteries" 
          mainValue={batteries.length} 
          icon={Battery}
          items={[
            { label: 'Charging', value: chargingBats, statusColor: 'blue' },
            { label: 'Discharging', value: dischargingBats, statusColor: 'amber' },
            { label: 'Idle', value: idleBats, statusColor: 'slate' },
          ]}
        />
        <StatCard 
          title="Generation" 
          mainValue={`${generation} kW`} 
          icon={Zap}
          items={[
            { label: 'Trend', value: '+5.2%', statusColor: 'emerald' },
            { label: 'Capacity', value: '85%' },
            { label: 'Peak (Today)', value: '450 kW' },
          ]}
        />
        <StatCard 
          title="Demand" 
          mainValue={`${demand} kW`} 
          icon={Activity}
          items={[
            { label: 'Trend', value: '-1.4%', statusColor: 'emerald' },
            { label: 'Load Level', value: 'Normal' },
            { label: 'Peak (Today)', value: '395 kW' },
          ]}
        />
      </div>

      {/* Main Grid Status and Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-1">
          <GridStatus 
            status={status} 
            generation={generation} 
            demand={demand} 
            balance={balance} 
          />
        </div>
        <div className="xl:col-span-2">
          <PowerChart />
        </div>
      </div>

      {/* Lower Components */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <EventList />
        </div>
        <div className="xl:col-span-1">
          <SimulationControl />
        </div>
      </div>
    </div>
  );
}
