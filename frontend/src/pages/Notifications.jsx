import { useState } from 'react';

export default function Notifications() {
  const [notifs, setNotifs] = useState([
    { id: 1, icon: '🎤', title: 'Interview Reminder', desc: 'Mock interview at 5 PM today', time: '2 hours ago', type: 'reminder', read: false, color: 'bg-orange-50' },
    { id: 2, icon: '📄', title: 'Resume Score Updated', desc: 'Your ATS score improved by 5% (76 → 81)', time: '5 hours ago', type: 'achievement', read: false, color: 'bg-green-50' },
    { id: 3, icon: '💼', title: 'New Job Match', desc: 'Frontend Developer at Razorpay matches your skills', time: '1 day ago', type: 'job', read: false, color: 'bg-blue-50' },
    { id: 4, icon: '🏆', title: 'Achievement Unlocked', desc: 'Completed 10 mock interviews! Keep going.', time: '2 days ago', type: 'achievement', read: true, color: 'bg-yellow-50' },
    { id: 5, icon: '⚠️', title: 'Application Deadline', desc: 'Microsoft application closes in 2 days', time: '2 days ago', type: 'deadline', read: true, color: 'bg-red-50' },
    { id: 6, icon: '🤖', title: 'AI Recommendation', desc: 'New career path suggested: AI/ML Engineer', time: '3 days ago', type: 'recommendation', read: true, color: 'bg-purple-50' },
    { id: 7, icon: '📊', title: 'Weekly Report Ready', desc: 'Your performance summary is now available', time: '5 days ago', type: 'report', read: true, color: 'bg-blue-50' },
    { id: 8, icon: '🎯', title: 'Skill Gap Identified', desc: 'Add Docker to improve job match rate by 15%', time: '1 week ago', type: 'recommendation', read: true, color: 'bg-orange-50' },
  ]);

  const [filter, setFilter] = useState('all');

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id) => setNotifs(notifs.filter(n => n.id !== id));
  const clearAll = () => { if (confirm('Clear all notifications?')) setNotifs([]); };

  const filtered = filter === 'all' ? notifs : filter === 'unread' ? notifs.filter(n => !n.read) : notifs.filter(n => n.type === filter);
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🔔 Notifications</h1>
          <p className="text-gray-500 text-sm">{unreadCount} unread of {notifs.length} total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllRead} disabled={unreadCount === 0} className="px-3 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded-lg disabled:opacity-40">✓ Mark all as read</button>
          <button onClick={clearAll} disabled={notifs.length === 0} className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-40">🗑 Clear all</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: `Unread (${unreadCount})` },
          { key: 'reminder', label: 'Reminders' },
          { key: 'job', label: 'Jobs' },
          { key: 'achievement', label: 'Achievements' },
          { key: 'recommendation', label: 'AI Tips' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${filter === f.key ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'}`}>{f.label}</button>
        ))}
      </div>

      {/* Notification list */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-500 font-medium">No notifications</p>
            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          filtered.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition ${!n.read ? 'bg-orange-50/30' : ''}`}>
              <div className={`w-10 h-10 ${n.color} rounded-lg flex items-center justify-center flex-shrink-0 text-lg`}>{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800 text-sm">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{n.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
              <div className="flex flex-col gap-1">
                {!n.read && <button onClick={() => markRead(n.id)} className="text-xs text-orange-600 hover:text-orange-700">Mark read</button>}
                <button onClick={() => deleteNotif(n.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
