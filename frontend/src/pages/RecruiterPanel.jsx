export default function RecruiterPanel() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Recruiter Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: '8' },
          { label: 'Applications', value: '156' },
          { label: 'Shortlisted', value: '42' },
          { label: 'Hired', value: '12' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border p-5 text-center">
            <p className="text-3xl font-bold text-orange-600">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-medium text-gray-800 mb-4">Recent Candidates</h3>
        {[
          { name: 'Shivani Kapase', role: 'Full Stack Developer', score: 87, status: 'Shortlisted' },
          { name: 'Yashvant Kumar', role: 'Backend Engineer', score: 82, status: 'Interview' },
          { name: 'Rahul Sharma', role: 'Frontend Developer', score: 76, status: 'Applied' },
          { name: 'Priya Patel', role: 'Data Analyst', score: 91, status: 'Offer Sent' },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">{c.name[0]}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{c.name}</p>
              <p className="text-xs text-gray-500">{c.role}</p>
            </div>
            <span className="text-sm font-bold text-orange-600">{c.score}%</span>
            <span className="px-2.5 py-1 text-xs rounded-full bg-green-100 text-green-700">{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
