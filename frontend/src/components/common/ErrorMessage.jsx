import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message = 'Backend Offline', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 text-center">
      <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 border border-rose-500/20">
        <AlertTriangle className="w-8 h-8 text-rose-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-2">{message}</h3>
      <p className="text-slate-400 text-sm mb-6 max-w-md">
        Unable to load grid data. Ensure the backend server is running and accessible.
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-lg transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}
