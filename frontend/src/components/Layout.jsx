import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout } from '../store/slices/authSlice';

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [notifs, setNotifs] = useState([
    { icon: '🎤', title: 'Interview Reminder', desc: 'Mock interview at 5 PM', time: '2h', color: 'bg-orange-50', read: false },
    { icon: '📄', title: 'Resume Score Updated', desc: 'Your ATS score improved by 5%', time: '5h', color: 'bg-green-50', read: false },
    { icon: '💼', title: 'New Job Match', desc: 'Frontend Developer at Razorpay', time: '1d', color: 'bg-blue-50', read: false },
  ]);

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  const navItems = [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/interview', icon: '🎤', label: 'Mock Interview' },
    { to: '/resume', icon: '📄', label: 'Resume Analyzer' },
    { to: '/jobs', icon: '💼', label: 'Job Tracker' },
    { to: '/career', icon: '🎯', label: 'Career Guide' },
    { to: '/analytics', icon: '📊', label: 'Analytics' },
    { to: '/profile', icon: '👤', label: 'Profile' },
  ];

  const quickActions = [
    { icon: '🎤', label: 'Start Interview', path: '/interview' },
    { icon: '📄', label: 'Analyze Resume', path: '/resume' },
    { icon: '💼', label: 'Add Job Application', path: '/jobs' },
    { icon: '📊', label: 'View Analytics', path: '/analytics' },
    { icon: '👤', label: 'Edit Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        <div className="h-16 px-5 border-b border-gray-100 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <div>
            <div className="font-bold text-gray-800 text-sm">SmartHire AI</div>
            <div className="text-[10px] text-gray-500">Placement Prep</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${isActive ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-800 truncate">{user?.name || 'User'}</div>
              <div className="text-[10px] text-gray-500 truncate">{user?.email || ''}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full mt-2 px-3 py-2 text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition flex items-center gap-2">
            <span>🚪</span><span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="ml-60 flex-1 min-h-screen">
        {/* Top bar */}
        <div className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Welcome back, {user?.name?.split(' ')[0] || 'Friend'}! 👋</h2>
            <p className="text-xs text-gray-500">Let's continue your placement preparation</p>
          </div>
          <div className="flex items-center gap-3 relative">
            {/* Notification Bell */}
            <div className="relative">
              <button onClick={() => { setShowNotifs(!showNotifs); setShowQuickActions(false); }} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs flex items-center gap-1.5 transition">
                🔔 {notifs.filter(n => !n.read).length > 0 && <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{notifs.filter(n => !n.read).length}</span>}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border shadow-xl z-30 overflow-hidden">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">Notifications</h3>
                    <button onClick={() => { setNotifs(notifs.map(n => ({...n, read: true}))); }} className="text-xs text-orange-600 hover:text-orange-700 font-medium cursor-pointer">Mark all as read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifs.filter(n => !n.read).length === 0 ? (
                      <div className="p-6 text-center text-sm text-gray-400">No new notifications 🎉</div>
                    ) : notifs.filter(n => !n.read).map((n, i) => (
                      <div key={i} className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex items-start gap-3">
                        <div className={`w-8 h-8 ${n.color} rounded-lg flex items-center justify-center flex-shrink-0`}>{n.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                        </div>
                        <span className="text-xs text-gray-400">{n.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t">
                    <button onClick={() => { navigate('/notifications'); setShowNotifs(false); }} className="text-xs text-orange-600 hover:text-orange-700 font-medium">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action */}
            <div className="relative">
              <button onClick={() => { setShowQuickActions(!showQuickActions); setShowNotifs(false); }} className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium transition">
                + Quick Action
              </button>
              {showQuickActions && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl border shadow-xl z-30 overflow-hidden">
                  <div className="p-3 border-b">
                    <p className="text-xs font-semibold text-gray-800">Quick Actions</p>
                  </div>
                  <div className="py-1">
                    {quickActions.map((q, i) => (
                      <button key={i} onClick={() => { navigate(q.path); setShowQuickActions(false); }} className="w-full px-4 py-2.5 text-left text-sm hover:bg-orange-50 flex items-center gap-3 transition">
                        <span>{q.icon}</span>
                        <span>{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Click outside to close */}
        {(showNotifs || showQuickActions) && (
          <div onClick={() => { setShowNotifs(false); setShowQuickActions(false); }} className="fixed inset-0 z-20"></div>
        )}

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
