import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import heroBackground from '../images/hero-background.png';
import successIllustration from '../images/success-illustration.png';
import { getFirstName } from '../utils/displayName';

/** Simple count-up hook for animated numbers. */
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);
  return value;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const firstName = getFirstName(user?.name);
  const readiness = useCountUp(65);

  // Semantic accent system — same color = same meaning across the app
  const stats = [
    { label: 'Mock Interviews', value: '12', icon: '🎤', accent: '#3B82F6', sub: 'ATS Compatible', trend: '+3 this week', up: true },
    { label: 'Resume Score', value: '78%', icon: '📄', accent: '#22C55E', sub: 'ATS Compatible', trend: '+2 pts', up: true },
    { label: 'Applications', value: '24', icon: '💼', accent: '#8B5CF6', sub: '8 active', trend: '+5 this week', up: true },
    { label: 'Readiness', value: '65%', icon: '🎯', accent: '#F97316', sub: 'Almost ready!', trend: '+4%', up: true },
  ];

  const colorMap = {
    orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
  };

  const recommendations = [
    { icon: '📚', text: 'Improve SQL Skills', desc: 'Practice 20 SQL problems on LeetCode' },
    { icon: '⚛️', text: 'Add React Projects', desc: 'Showcase 2-3 production-grade projects' },
    { icon: '🔑', text: 'Optimize Resume Keywords', desc: 'Add Docker, AWS, CI/CD to your resume' },
    { icon: '💬', text: 'Practice Communication', desc: 'Take 5 HR mock interviews this week' },
  ];

  const recentApps = [
    { company: 'Google', role: 'SDE Intern', status: 'Interview', date: '20-Jun-2026', color: 'orange' },
    { company: 'Amazon', role: 'Analyst', status: 'Applied', date: '18-Jun-2026', color: 'blue' },
    { company: 'Microsoft', role: 'Developer', status: 'Shortlisted', date: '16-Jun-2026', color: 'purple' },
  ];

  const activity = [
    { icon: '✅', text: 'Mock Interview Completed', time: '2 hours ago', detail: 'DSA - Medium • Score: 8.2/10' },
    { icon: '📊', text: 'Resume ATS Score Updated', time: '5 hours ago', detail: '76 → 78 (+2 points)' },
    { icon: '🎯', text: 'New Job Recommendation Available', time: '1 day ago', detail: 'Frontend Developer at Razorpay' },
    { icon: '🏆', text: 'New Certification Added', time: '2 days ago', detail: 'AWS Cloud Practitioner' },
  ];

  // Bar chart data (weekly resume score)
  const chartData = [55, 60, 58, 65, 70, 68, 75, 78];
  const chartMax = 100;
  const target = 85;

  // Placement readiness sub-metrics
  const readinessMetrics = [
    { label: 'Skills', value: 85, color: '#22C55E' },
    { label: 'Interviews', value: 70, color: '#3B82F6' },
    { label: 'Resume', value: 78, color: '#F97316' },
  ];

  const quickActions = [
    { icon: '🎤', title: 'Start Interview', accent: '#3B82F6', path: '/interview' },
    { icon: '📄', title: 'Analyze Resume', accent: '#22C55E', path: '/resume' },
    { icon: '💼', title: 'Find Jobs', accent: '#8B5CF6', path: '/jobs' },
    { icon: '🎯', title: 'Career Guide', accent: '#F97316', path: '/career' },
    { icon: '📊', title: 'View Analytics', accent: '#EC4899', path: '/analytics' },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 font-display">Dashboard <span className="text-gray-300">/</span> Overview</div>

      {/* Welcome Banner — navy gradient with hero image + orange accent */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1A2C5B 100%)' }}>
        {/* hero photo layer */}
        <img src={heroBackground} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.15]" />
        {/* glow accents */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-2xl"></div>
        {/* success illustration, bottom-right anchored */}
        <img src={successIllustration} alt="" aria-hidden
          className="pointer-events-none absolute bottom-0 right-4 hidden sm:block h-40 w-auto object-contain opacity-90 mix-blend-screen" />

        <div className="relative max-w-xl">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">
            Welcome Back, <span className="text-gradient-orange">{firstName}</span>! 👋
          </h1>
          <p className="text-white/70 text-xs sm:text-sm mt-2">AI-Powered Placement Preparation Platform</p>
          <div className="flex flex-wrap gap-2 mt-5">
            <button onClick={() => navigate('/interview')} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[10px] text-xs font-semibold transition shadow-lg shadow-orange-900/20">🎤 Start Interview</button>
            <button onClick={() => navigate('/resume')} className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white rounded-[10px] text-xs font-semibold transition border border-white/15">📄 Analyze Resume</button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 transition hover:-translate-y-0.5"
            style={{
              borderTop: `3px solid ${stat.accent}`,
              border: '1px solid #F1F5F9',
              borderTopWidth: '3px',
              borderTopColor: stat.accent,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-base"
                style={{ background: `${stat.accent}1A` }}>{stat.icon}</div>
            </div>
            <p className="stat-number text-4xl" style={{ color: stat.accent }}>{stat.value}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-[11px] font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? '▲' : '▼'} {stat.trend}
              </span>
              <span className="text-[11px] text-gray-400">• {stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Placement Readiness Gauge */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-gray-800 text-sm">🎯 Placement Readiness</h3>
            <span className="text-xs text-gray-400">Overall</span>
          </div>
          <div className="flex items-center justify-center my-4">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 200 200" className="transform -rotate-90 w-full h-full">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f97316" strokeWidth="20"
                  strokeDasharray={`${readiness * 5.03} ${100 * 5.03}`} strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.1s linear' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="stat-number text-4xl text-orange-600">{readiness}%</p>
                <span className="mt-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>Almost Ready</span>
              </div>
            </div>
          </div>
          {/* Progress bars instead of excel-like boxes */}
          <div className="space-y-3 mt-2">
            {readinessMetrics.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-20">{m.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bar-animate" style={{ width: `${m.value}%`, background: m.color }}></div>
                </div>
                <span className="text-xs font-semibold text-gray-700 w-9 text-right">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Score Trend */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-gray-800 text-sm">📈 Resume Score Trend</h3>
            <span className="text-xs text-green-600 font-medium">↑ +12% this month</span>
          </div>
          <div className="relative h-44 mb-2">
            {/* Target line */}
            <div className="absolute left-0 right-0 border-t border-dashed border-gray-300 z-0"
              style={{ bottom: `${(target / chartMax) * 100}%` }}>
              <span className="absolute -top-2 right-0 text-[9px] text-gray-400 bg-white px-1">Target {target}%</span>
            </div>
            <div className="relative h-full flex items-end justify-between gap-2 z-10">
              {chartData.map((val, i) => {
                const isCurrent = i === chartData.length - 1;
                return (
                  <div key={i} className="group flex-1 flex flex-col items-center justify-end gap-1 h-full">
                    <div className="relative w-full flex justify-center">
                      {/* tooltip */}
                      <span className="pointer-events-none absolute -top-7 opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                        {val}%
                      </span>
                    </div>
                    <div
                      className="w-full rounded-t-md bar-rise transition-all"
                      style={{
                        height: `${(val / chartMax) * 100}%`,
                        background: isCurrent ? '#F97316' : '#FED7AA',
                        animationDelay: `${i * 60}ms`,
                      }}
                      title={`Week ${i + 1}: ${val}%`}
                      onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = '#FDBA74'; }}
                      onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = '#FED7AA'; }}
                    ></div>
                    <span className="text-[10px] text-gray-400">W{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t text-xs">
            <span className="text-gray-500">Current: <span className="font-bold text-gray-800">78%</span></span>
            <span className="text-gray-500">Best: <span className="font-bold text-green-600">82%</span></span>
            <span className="text-gray-500">Target: <span className="font-bold text-orange-600">85%</span></span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h3 className="font-display font-semibold text-gray-800 text-sm mb-3">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.path)}
              className="group relative overflow-hidden rounded-2xl border-[1.5px] border-slate-100 p-5 text-left transition-all hover:-translate-y-0.5"
              style={{ transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = action.accent; e.currentTarget.style.boxShadow = `0 8px 24px ${action.accent}1F`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F1F5F9'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg mb-3 transition-transform group-hover:scale-110"
                style={{ background: `${action.accent}1A` }}>{action.icon}</div>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                {action.title}
                <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: action.accent }}>→</span>
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Career Recommendations Preview */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl border border-orange-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-gray-800 text-base flex items-center gap-2">🎯 Career Recommendations</h3>
            <p className="text-xs text-gray-600 mt-0.5">AI-powered career paths based on your profile</p>
          </div>
          <button onClick={() => navigate('/career')} className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-[10px] transition">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Full Stack Developer', match: 92, salary: '₹8-25 LPA', icon: '💻', skills: 'React, Node.js, MongoDB' },
            { title: 'Frontend Engineer', match: 88, salary: '₹7-22 LPA', icon: '🎨', skills: 'React, TypeScript, CSS' },
            { title: 'Backend Engineer', match: 78, salary: '₹8-28 LPA', icon: '⚙️', skills: 'Node.js, MongoDB, APIs' },
          ].map((path, i) => (
            <div key={i} onClick={() => navigate('/career')} className="bg-white rounded-xl border p-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{path.icon}</div>
                <span className={`stat-number text-lg ${path.match >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{path.match}%</span>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm">{path.title}</h4>
              <p className="text-xs text-orange-600 mt-1">{path.salary}</p>
              <p className="text-[11px] text-gray-500 mt-1.5">{path.skills}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Recommendations */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-gray-800 text-sm">🤖 AI Recommendations</h3>
            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">4 new</span>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 hover:bg-orange-50 rounded-lg transition cursor-pointer group">
                <span className="text-xl">{rec.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{rec.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{rec.desc}</p>
                </div>
                <span className="text-orange-500 text-xs opacity-0 group-hover:opacity-100 transition">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-gray-800 text-sm">📋 Recent Activity</h3>
            <a href="#" className="text-xs text-orange-600 hover:text-orange-700 font-medium">View all</a>
          </div>
          <div className="space-y-3">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-gray-800 text-sm">💼 Recent Applications</h3>
          <button onClick={() => navigate('/jobs')} className="text-xs text-orange-600 hover:text-orange-700 font-medium">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="pb-2 text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="pb-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="pb-2 text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentApps.map((app, i) => {
                const c = colorMap[app.color];
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-800">{app.company}</td>
                    <td className="py-3 text-gray-600">{app.role}</td>
                    <td className="py-3"><span className={`px-2 py-1 ${c.bg} ${c.text} rounded-full text-xs font-medium`}>{app.status}</span></td>
                    <td className="py-3 text-gray-500 text-xs">{app.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
