import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const stats = [
    { label: 'Mock Interviews', value: '12', icon: '🎤', color: 'orange', sub: '+3 this week' },
    { label: 'Resume Score', value: '78%', icon: '📄', color: 'green', sub: 'ATS Compatible' },
    { label: 'Applications', value: '24', icon: '💼', color: 'blue', sub: '8 active' },
    { label: 'Readiness', value: '65%', icon: '🎯', color: 'purple', sub: 'Almost ready!' },
  ];

  const colorMap = {
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
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

  // Mini chart data points
  const chartData = [55, 60, 58, 65, 70, 68, 75, 78];

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-32 -mr-32"></div>
        <div className="absolute bottom-0 right-12 w-32 h-32 bg-white opacity-10 rounded-full -mb-16"></div>
        <div className="relative">
          <h1 className="text-2xl font-bold">Welcome Back, {user?.name?.split(' ')[0] || 'Friend'}! 👋</h1>
          <p className="text-orange-100 text-sm mt-1">AI-Powered Placement Preparation Platform</p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => navigate('/interview')} className="px-4 py-2 bg-white text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-50 transition">🎤 Start Interview</button>
            <button onClick={() => navigate('/resume')} className="px-4 py-2 bg-orange-700 text-white rounded-lg text-xs font-medium hover:bg-orange-800 transition">📄 Analyze Resume</button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const c = colorMap[stat.color];
          return (
            <div key={i} className={`bg-white rounded-xl border ${c.border} p-5 hover:shadow-md transition`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                <div className={`w-8 h-8 ${c.bg} rounded-lg flex items-center justify-center`}>{stat.icon}</div>
              </div>
              <p className={`text-3xl font-bold ${c.text}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Placement Readiness Gauge */}
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">🎯 Placement Readiness</h3>
            <span className="text-xs text-gray-500">Overall</span>
          </div>
          <div className="flex items-center justify-center my-6">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 200 200" className="transform -rotate-90 w-full h-full">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f97316" strokeWidth="20" strokeDasharray={`${65 * 5.03} ${100 * 5.03}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-orange-600">65%</p>
                <p className="text-xs text-gray-500 mt-1">Almost ready!</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-green-50 rounded-lg"><p className="text-sm font-bold text-green-600">85%</p><p className="text-xs text-gray-500">Skills</p></div>
            <div className="p-2 bg-orange-50 rounded-lg"><p className="text-sm font-bold text-orange-600">70%</p><p className="text-xs text-gray-500">Interviews</p></div>
            <div className="p-2 bg-blue-50 rounded-lg"><p className="text-sm font-bold text-blue-600">78%</p><p className="text-xs text-gray-500">Resume</p></div>
          </div>
        </div>

        {/* Resume Score Trend */}
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">📈 Resume Score Trend</h3>
            <span className="text-xs text-green-600 font-medium">↑ +12% this month</span>
          </div>
          <div className="h-44 flex items-end justify-between gap-2 mb-2">
            {chartData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-md transition-all hover:from-orange-600" style={{ height: `${val * 1.5}px` }}></div>
                <span className="text-[10px] text-gray-400">W{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t text-xs">
            <span className="text-gray-500">Current: <span className="font-bold text-gray-800">78%</span></span>
            <span className="text-gray-500">Best: <span className="font-bold text-green-600">82%</span></span>
            <span className="text-gray-500">Target: <span className="font-bold text-orange-600">85%</span></span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { icon: '🎤', title: 'Start Interview', color: 'orange', path: '/interview' },
            { icon: '📄', title: 'Analyze Resume', color: 'blue', path: '/resume' },
            { icon: '💼', title: 'Find Jobs', color: 'green', path: '/jobs' },
            { icon: '🎯', title: 'Career Guide', color: 'red', path: '/career' },
            { icon: '📊', title: 'View Analytics', color: 'purple', path: '/analytics' },
          ].map((action, i) => (
            <button key={i} onClick={() => navigate(action.path)} className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-orange-300 transition text-left group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
              <p className="text-sm font-medium text-gray-800 group-hover:text-orange-600">{action.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Career Recommendations Preview */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl border border-orange-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">🎯 Career Recommendations</h3>
            <p className="text-xs text-gray-600 mt-0.5">AI-powered career paths based on your profile</p>
          </div>
          <button onClick={() => navigate('/career')} className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg transition">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Full Stack Developer', match: 92, salary: '₹8-25 LPA', icon: '💻', skills: 'React, Node.js, MongoDB' },
            { title: 'Frontend Engineer', match: 88, salary: '₹7-22 LPA', icon: '🎨', skills: 'React, TypeScript, CSS' },
            { title: 'Backend Engineer', match: 78, salary: '₹8-28 LPA', icon: '⚙️', skills: 'Node.js, MongoDB, APIs' },
          ].map((path, i) => (
            <div key={i} onClick={() => navigate('/career')} className="bg-white rounded-lg border p-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{path.icon}</div>
                <span className={`text-lg font-bold ${path.match >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{path.match}%</span>
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
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">🤖 AI Recommendations</h3>
            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">4 new</span>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 hover:bg-orange-50 rounded-lg transition cursor-pointer">
                <span className="text-xl">{rec.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{rec.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{rec.desc}</p>
                </div>
                <span className="text-orange-500 text-xs">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">📋 Recent Activity</h3>
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
      <div className="bg-white rounded-xl border p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 text-sm">💼 Recent Applications</h3>
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
