import { Sun, AlertTriangle, ShieldCheck, ZapOff } from 'lucide-react';
import { useGrid } from '../context/GridContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function SolarNodes() {
  const {
    nodes,
    loading,
    error,
    refreshData,
    connectionStatus,
  } = useGrid();

  if (loading) {
    return <Loading message="Loading solar nodes..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Backend connection failed: ${error}`}
        onRetry={refreshData}
      />
    );
  }

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">
              ACTIVE
            </span>
          </div>
        );

      case 'WARNING':
        return (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-medium">
              WARNING
            </span>
          </div>
        );

      case 'FAULT':
        return (
          <div className="flex items-center gap-2">
            <ZapOff className="w-4 h-4 text-rose-500" />
            <span className="text-rose-500 font-medium">
              FAULT
            </span>
          </div>
        );

      default:
        return (
          <span className="text-slate-400">
            {status || 'UNKNOWN'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100 flex items-center gap-2">
            <Sun className="w-6 h-6 text-emerald-400" />
            Solar Nodes
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Live solar node data from GridWeaver backend
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'LIVE'
                ? 'bg-emerald-400'
                : 'bg-rose-500'
            }`}
          />

          <span className="text-slate-400">
            {connectionStatus}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {nodes.length === 0 ? (
        <div className="p-8 border border-white/[0.06] border-dashed rounded-xl flex items-center justify-center text-slate-500">
          No solar nodes available.
        </div>
      ) : (
        <div className="gw-card p-5 overflow-hidden shadow-sm">

          <div className="mb-4 text-sm text-slate-400">
            Total Solar Nodes:{' '}
            <span className="text-slate-200 font-medium">
              {nodes.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">

              <thead className="gw-label bg-transparent border-b border-white/[0.04]">
                <tr>
                  <th className="px-6 py-4">Node ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">
                    Power Output
                  </th>
                  <th className="px-6 py-4 text-right">
                    Voltage
                  </th>
                  <th className="px-6 py-4 text-right">
                    Temperature
                  </th>
                  <th className="px-6 py-4 text-right">
                    Last Updated
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.04]">
                {nodes.map((node) => (
                  <tr
                    key={node.id || node.nodeId}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-200">
                      {node.id || node.nodeId}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusDisplay(node.status)}
                    </td>

                    <td className="px-6 py-4 text-right text-slate-300 font-mono">
                      {Number(
                        node.powerOutput ?? node.power ?? 0
                      ).toFixed(1)}{' '}
                      kW
                    </td>

                    <td className="px-6 py-4 text-right text-slate-300 font-mono">
                      {Number(node.voltage ?? 0).toFixed(1)} V
                    </td>

                    <td className="px-6 py-4 text-right text-slate-300 font-mono">
                      {Number(node.temperature ?? 0).toFixed(1)} °C
                    </td>

                    <td className="px-6 py-4 text-right text-slate-500">
                      {node.lastUpdated || 'Recently'}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}