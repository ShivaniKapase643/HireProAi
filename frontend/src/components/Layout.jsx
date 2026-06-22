import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../store/slices/authSlice';
import smarthireIcon from '../images/smarthire-icon.png';
import twintechLogo from '../images/twintech-logo.png';
import avatarDefault from '../images/profile.png';
import { getCleanName, getFirstName } from '../utils/displayName';

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebarCollapsed') === '1');
  const [notifs, setNotifs] = useState([
    { icon: '🎤', title: 'Interview Reminder', desc: 'Mock interview at 5 PM', time: '2h', color: 'bg-orange-50', read: false },
    { icon: '📄', title: 'Resume Score Updated', desc: 'Your ATS score improved by 5%', time: '5h', color: 'bg-green-50', read: false },
    { icon: '💼', title: 'New Job Match', desc: 'Frontend Developer at Razorpay', time: '1d', color: 'bg-blue-50', read: false },
  ]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  const cleanName = getCleanName(user?.name) || 'User';
  const firstName = getFirstName(user?.name);
  const lastActive = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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

  const unreadCount = notifs.filter(n => !n.read).length;
  const sidebarWidth = collapsed ? 'lg:w-20' : 'lg:w-60';
  const mainMargin = collapsed ? 'lg:ml-20' : 'lg:ml-60';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"></div>
      )}

      {/* Sidebar — brand navy to match login left panel */}
      <aside className={`fixed h-full w-60 ${sidebarWidth} bg-[#0D1B3E] flex flex-col z-40 transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo area */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src={smarthireIcon} alt="SmartHire AI" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
            {!collapsed && (
              <div className="min-w-0">
                <div className="font-display font-bold text-white text-sm leading-tight">SmartHire AI</div>
                <div className="text-[10px] text-white/50">Placement Prep</div>
              </div>
            )}
          </div>
          {/* Mobile close */}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white text-xl">×</button>
          {/* Desktop collapse toggle */}
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="hidden lg:block text-white/50 hover:text-white text-lg" title="Collapse sidebar">«</button>
          )}
        </div>

        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="hidden lg:block mx-auto mt-2 text-white/50 hover:text-white text-lg" title="Expand sidebar">»</button>
        )}

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm transition-all ${collapsed ? 'justify-center rounded-lg' : 'rounded-r-xl'} ${
                  isActive
                    ? 'bg-orange-500/15 text-white font-medium border-l-[3px] border-orange-500'
                    : 'text-white/65 hover:bg-white/[0.06] hover:text-white border-l-[3px] border-transparent'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User + team credit */}
        <div className="p-3 border-t border-white/10">
          <div className={`flex items-center gap-3 px-1 py-1 ${collapsed ? 'justify-center' : ''}`}>
            <img src={avatarDefault} alt={cleanName} className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500/40 flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">{cleanName}</div>
                <div className="text-[10px] text-white/50 truncate">{user?.email || ''}</div>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className={`w-full mt-2 px-3 py-2 text-xs text-white/65 hover:bg-red-500/15 hover:text-red-300 rounded-lg transition flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <span>🚪</span>{!collapsed && <span>Logout</span>}
          </button>
          {!collapsed && (
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
              <img src={twintechLogo} alt="TwinTech" className="w-5 h-5 object-contain opacity-80" />
              <span className="text-[10px] text-white/40 truncate">TwinTech • Yashvant &amp; Shivani</span>
            </div>
          )}
        </div>
      </aside>

      <main className={`flex-1 min-h-screen ${mainMargin} transition-all duration-300`}>
        {/* Top bar */}
        <div className="h-16 bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-800 text-2xl flex-shrink-0">☰</button>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-medium text-gray-700 truncate">Welcome, {firstName}! 👋</h2>
              <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">Last active: Today, {lastActive}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 relative flex-shrink-0">
            {/* Notification Bell */}
            <div className="relative">
              <button onClick={() => { setShowNotifs(!showNotifs); setShowQuickActions(false); }} className="px-2 sm:px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs flex items-center gap-1.5 transition">
                🔔 {unreadCount > 0 && <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full badge-pulse">{unreadCount}</span>}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-xl border shadow-xl z-40 overflow-hidden">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">Notifications</h3>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setNotifs(notifs.map(n => ({...n, read: true}))); }} className="text-xs text-orange-600 hover:text-orange-700 font-medium">Mark all as read</button>
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
                    <button type="button" onClick={(e) => { e.stopPropagation(); navigate('/notifications'); setShowNotifs(false); }} className="text-xs text-orange-600 hover:text-orange-700 font-medium">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action */}
            <div className="relative">
              <button onClick={() => { setShowQuickActions(!showQuickActions); setShowNotifs(false); }} className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[10px] text-xs font-semibold transition whitespace-nowrap shadow-sm">
                <span className="hidden sm:inline">+ Quick Action</span>
                <span className="sm:hidden">+</span>
              </button>
              {showQuickActions && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl border shadow-xl z-40 overflow-hidden">
                  <div className="p-3 border-b">
                    <p className="text-xs font-semibold text-gray-800">Quick Actions</p>
                  </div>
                  <div className="py-1">
                    {quickActions.map((q, i) => (
                      <button key={i} type="button" onClick={(e) => { e.stopPropagation(); navigate(q.path); setShowQuickActions(false); }} className="w-full px-4 py-2.5 text-left text-sm hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 transition cursor-pointer">
                        <span className="text-base">{q.icon}</span>
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
          <div onClick={() => { setShowNotifs(false); setShowQuickActions(false); }} className="fixed inset-0 z-10"></div>
        )}

        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
