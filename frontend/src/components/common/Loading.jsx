import { Activity } from 'lucide-react';

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 text-slate-400">
      <Activity className="w-8 h-8 animate-spin text-blue-500 mb-4" />
      <p className="text-sm font-medium tracking-wide">{message}</p>
    </div>
  );
}
