export default function AdminPanel() {
  const stats = [
    { label: 'Total Users', value: '2,450', change: '+120 this week' },
    { label: 'Active Sessions', value: '342', change: 'Online now' },
    { label: 'Interviews Today', value: '89', change: '+12% from yesterday' },
    { label: 'System Health', value: '99.9%', change: 'All services running' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{s.value}</p>
            <p className="text-xs text-green-600 mt-1">{s.change}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-medium text-gray-800 mb-3">Recent Users</h3>
          {['Shivani Kapase', 'Yashvant Kumar', 'Rahul Sharma', 'Priya Patel'].map((u, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">{u[0]}</div>
              <span className="text-sm text-gray-700">{u}</span>
              <span className="ml-auto text-xs text-gray-400">Student</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-medium text-gray-800 mb-3">System Logs</h3>
          {['Server restarted', 'New user registered', 'AI model updated', 'Backup completed'].map((log, i) => (
            <div key={i} className="py-2 border-b border-gray-50 last:border-0 text-sm text-gray-600">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
