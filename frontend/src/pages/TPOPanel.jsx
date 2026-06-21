export default function TPOPanel() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Placement Officer Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '580', color: 'text-blue-600' },
          { label: 'Placed', value: '234', color: 'text-green-600' },
          { label: 'In Progress', value: '196', color: 'text-orange-600' },
          { label: 'Placement Rate', value: '78%', color: 'text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border p-5 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-medium text-gray-800 mb-4">Department-wise Placement Status</h3>
        {[
          { dept: 'Computer Science', total: 180, placed: 142, rate: '79%' },
          { dept: 'Information Technology', total: 150, placed: 110, rate: '73%' },
          { dept: 'Electronics', total: 120, placed: 85, rate: '71%' },
          { dept: 'Mechanical', total: 130, placed: 78, rate: '60%' },
        ].map((d, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
            <span className="w-44 text-sm font-medium text-gray-700">{d.dept}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-orange-500" style={{width: d.rate}}></div>
            </div>
            <span className="text-sm text-gray-600 w-24">{d.placed}/{d.total}</span>
            <span className="text-sm font-bold text-orange-600 w-12">{d.rate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
