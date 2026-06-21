import { useState } from 'react';

const initialApps = [];

const stages = [
  { key: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-700', icon: '📨' },
  { key: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-100 text-purple-700', icon: '⭐' },
  { key: 'assessment', label: 'Assessment', color: 'bg-yellow-100 text-yellow-700', icon: '📝' },
  { key: 'interview_scheduled', label: 'Interview', color: 'bg-orange-100 text-orange-700', icon: '🎤' },
  { key: 'selected', label: 'Selected', color: 'bg-emerald-100 text-emerald-700', icon: '🎉' },
  { key: 'offer_received', label: 'Offer', color: 'bg-green-100 text-green-700', icon: '💼' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700', icon: '❌' },
];

export default function JobTracker() {
  const [apps, setApps] = useState(initialApps);
  const [view, setView] = useState('table'); // table, kanban
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [newApp, setNewApp] = useState({ company: '', role: '', stage: 'applied', salary: '', mode: 'Remote', notes: '', priority: 'medium' });

  const addApplication = () => {
    if (!newApp.company || !newApp.role) return;
    setApps([{ ...newApp, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...apps]);
    setNewApp({ company: '', role: '', stage: 'applied', salary: '', mode: 'Remote', notes: '', priority: 'medium' });
    setShowAdd(false);
  };

  const updateStage = (id, stage) => setApps(apps.map(a => a.id === id ? { ...a, stage } : a));
  const deleteApp = (id) => setApps(apps.filter(a => a.id !== id));

  const filtered = apps.filter(a => {
    if (filter !== 'all' && a.stage !== filter) return false;
    if (search && !a.company.toLowerCase().includes(search.toLowerCase()) && !a.role.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: apps.length,
    active: apps.filter(a => !['rejected', 'offer_received', 'selected'].includes(a.stage)).length,
    offers: apps.filter(a => a.stage === 'offer_received' || a.stage === 'selected').length,
    interviews: apps.filter(a => a.stage === 'interview_scheduled').length,
    responseRate: Math.round((apps.filter(a => a.stage !== 'applied').length / apps.length) * 100),
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Application Tracker</h1>
          <p className="text-gray-500 text-sm">Manage all your applications, interviews & offers</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition">+ Add Application</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-gray-800', bg: 'bg-gray-50' },
          { label: 'Active', value: stats.active, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Interviews', value: stats.interviews, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Offers', value: stats.offers, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Response Rate', value: stats.responseRate + '%', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl border p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white rounded-xl border p-5 space-y-3">
          <h3 className="font-medium text-gray-800">New Application</h3>
          <div className="grid grid-cols-3 gap-3">
            <input placeholder="Company *" value={newApp.company} onChange={e => setNewApp({...newApp, company: e.target.value})} className="px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" />
            <input placeholder="Role *" value={newApp.role} onChange={e => setNewApp({...newApp, role: e.target.value})} className="px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" />
            <input placeholder="Salary (e.g. ₹12 LPA)" value={newApp.salary} onChange={e => setNewApp({...newApp, salary: e.target.value})} className="px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" />
            <select value={newApp.mode} onChange={e => setNewApp({...newApp, mode: e.target.value})} className="px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500">
              <option>Remote</option><option>Hybrid</option><option>Onsite</option>
            </select>
            <select value={newApp.priority} onChange={e => setNewApp({...newApp, priority: e.target.value})} className="px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500">
              <option value="high">High Priority</option><option value="medium">Medium</option><option value="low">Low</option>
            </select>
            <input placeholder="Notes" value={newApp.notes} onChange={e => setNewApp({...newApp, notes: e.target.value})} className="px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="flex gap-2">
            <button onClick={addApplication} className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">Save</button>
            <button onClick={() => setShowAdd(false)} className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3">
        <input placeholder="Search company or role..." value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 w-64" />
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded text-xs font-medium ${filter === 'all' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-600'}`}>All</button>
          {stages.slice(0, 5).map(s => (
            <button key={s.key} onClick={() => setFilter(s.key)} className={`px-3 py-1.5 rounded text-xs font-medium ${filter === s.key ? 'bg-white shadow-sm text-orange-600' : 'text-gray-600'}`}>{s.label}</button>
          ))}
        </div>
        <div className="ml-auto flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setView('table')} className={`px-3 py-1.5 rounded text-xs ${view === 'table' ? 'bg-white shadow-sm' : ''}`}>Table</button>
          <button onClick={() => setView('kanban')} className={`px-3 py-1.5 rounded text-xs ${view === 'kanban' ? 'bg-white shadow-sm' : ''}`}>Kanban</button>
        </div>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Salary</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Mode</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(app => {
                const stageInfo = stages.find(s => s.key === app.stage) || stages[0];
                return (
                  <tr key={app.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${app.priority === 'high' ? 'bg-red-500' : app.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                        <span className="font-medium text-gray-800">{app.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{app.role}</td>
                    <td className="px-4 py-3">
                      <select value={app.stage} onChange={e => updateStage(app.id, e.target.value)} className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 ${stageInfo.color} cursor-pointer`}>
                        {stages.map(s => <option key={s.key} value={s.key}>{s.icon} {s.label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{app.salary}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{app.mode}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{app.date}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => deleteApp(app.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center py-8 text-gray-400">No applications found</p>}
        </div>
      )}

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="grid grid-cols-4 gap-3 overflow-x-auto">
          {stages.slice(0, 4).map(stage => (
            <div key={stage.key} className="bg-gray-50 rounded-xl p-3 min-h-[300px]">
              <h4 className="font-medium text-sm text-gray-700 mb-3 flex items-center gap-1">
                {stage.icon} {stage.label}
                <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{apps.filter(a => a.stage === stage.key).length}</span>
              </h4>
              <div className="space-y-2">
                {apps.filter(a => a.stage === stage.key).map(app => (
                  <div key={app.id} className="bg-white rounded-lg border p-3 shadow-sm">
                    <p className="font-medium text-sm text-gray-800">{app.company}</p>
                    <p className="text-xs text-gray-500">{app.role}</p>
                    {app.notes && <p className="text-xs text-orange-600 mt-1">{app.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
