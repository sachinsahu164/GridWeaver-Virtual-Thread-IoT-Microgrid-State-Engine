// TODO BACKEND API REQUIRED
// Is feature ko properly show karne ke liye backend se recent grid
// events/history chahiye.
// Current backend APIs mein dedicated event-history endpoint nahi hai,
// isliye frontend fake event data generate nahi karega.

export default function Events() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100">System Events</h1>
      </div>
      <div className="p-8 border border-slate-800 border-dashed rounded-xl flex items-center justify-center text-slate-500">
        No events available.
      </div>
    </div>
  );
}
