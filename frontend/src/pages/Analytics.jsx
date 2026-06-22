import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const data = {
    interviews: { total: 18, avgScore: 72, best: 'Web Development', weak: 'System Design' },
    resume: { atsScore: 78, lastImproved: '+12 points this month' },
    applications: { total: 24, responseRate: 33, interviewRate: 21 },
    skills: [
      { name: 'React.js', level: 85, category: 'Frontend' },
      { name: 'Node.js', level: 78, category: 'Backend' },
      { name: 'MongoDB', level: 72, category: 'Database' },
      { name: 'JavaScript', level: 82, category: 'Language' },
      { name: 'DSA', level: 65, category: 'CS Core' },
      { name: 'System Design', level: 45, category: 'Architecture' },
      { name: 'Communication', level: 80, category: 'Soft Skill' },
      { name: 'Problem Solving', level: 75, category: 'Soft Skill' },
    ],
    weeklyProgress: [
      { week: 'W1', interviews: 2, score: 60 },
      { week: 'W2', interviews: 3, score: 65 },
      { week: 'W3', interviews: 4, score: 68 },
      { week: 'W4', interviews: 5, score: 72 },
      { week: 'W5', interviews: 4, score: 74 },
    ],
  };

  // Single brand-aligned color scheme - all use shades of orange/amber for skill bars
  const getSkillColor = (level) => {
    if (level >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (level >= 65) return { bar: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50' };
    if (level >= 50) return { bar: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50' };
    return { bar: 'bg-rose-400', text: 'text-rose-600', bg: 'bg-rose-50' };
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📊 Analytics & Insights</h1>
          <p className="text-gray-500 text-sm mt-0.5">Data-driven insights to track your placement preparation journey</p>
        </div>
        <button onClick={() => alert('Report exported as PDF (feature ready for backend integration)')} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition">
          📥 Export Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border rounded-lg p-1 w-fit shadow-sm">
        {[
          { key: 'overview', label: 'Overview', icon: '📈' },
          { key: 'interviews', label: 'Interviews', icon: '🎤' },
          { key: 'skills', label: 'Skills', icon: '⚡' },
          { key: 'progress', label: 'Progress', icon: '🚀' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-1.5 ${activeTab === tab.key ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}>
            <span>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Placement Readiness', value: '72%', change: '+8%', icon: '🎯' },
              { label: 'Interview Avg Score', value: '72/100', change: '+5 pts', icon: '🎤' },
              { label: 'ATS Resume Score', value: '78%', change: '+12%', icon: '📄' },
              { label: 'Response Rate', value: '33%', change: '+5%', icon: '💼' },
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-xl border p-5 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 font-medium uppercase">{m.label}</p>
                  <span className="text-2xl">{m.icon}</span>
                </div>
                <p className="text-3xl font-bold text-gray-800 mt-2">{m.value}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">↑ {m.change} this month</p>
              </div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💪</span>
                <h3 className="font-semibold text-gray-800">Your Strengths</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  { skill: 'React & Frontend Development', level: 'Excellent' },
                  { skill: 'Communication Skills', level: 'Strong' },
                  { skill: 'Problem Solving Approach', level: 'Strong' },
                  { skill: 'Project Portfolio Quality', level: 'Above Avg' },
                ].map((s, i) => (
                  <li key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      <span className="text-gray-700">{s.skill}</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📈</span>
                <h3 className="font-semibold text-gray-800">Areas to Improve</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  { skill: 'System Design Knowledge', level: 'Critical' },
                  { skill: 'Advanced DSA (Graphs, DP)', level: 'High' },
                  { skill: 'Cloud & DevOps Skills', level: 'High' },
                  { skill: 'Technical Communication', level: 'Medium' },
                ].map((s, i) => (
                  <li key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.level === 'Critical' ? 'bg-rose-500' : s.level === 'High' ? 'bg-orange-500' : 'bg-amber-500'}`}></span>
                      <span className="text-gray-700">{s.skill}</span>
                    </div>
                    <span className={`text-xs font-medium ${s.level === 'Critical' ? 'text-rose-600' : s.level === 'High' ? 'text-orange-600' : 'text-amber-600'}`}>{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Insights Card */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">AI Insight of the Week</h3>
                <p className="text-sm text-gray-600 mt-1">Your interview scores improved by 12 points in the last 4 weeks. Focus on System Design next — it's the #1 skill needed for your target companies (Google, Microsoft, Amazon).</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => navigate('/career')} className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg">Get Learning Plan</button>
                  <button onClick={() => navigate('/interview')} className="px-3 py-1.5 bg-white border border-orange-300 text-orange-600 hover:bg-orange-50 text-xs font-medium rounded-lg">Practice Interview</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SKILLS TAB */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          {/* Legend */}
          <div className="bg-white rounded-xl border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Skill Proficiency</h3>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>Expert (80%+)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>Proficient (65-80%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>Intermediate (50-65%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-rose-400 rounded-full"></span>Beginner (&lt;50%)</span>
              </div>
            </div>

            <div className="space-y-3">
              {data.skills.map(skill => {
                const c = getSkillColor(skill.level);
                return (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                        <span className="text-[10px] text-gray-400 px-1.5 py-0.5 bg-gray-100 rounded">{skill.category}</span>
                      </div>
                      <span className={`text-sm font-bold ${c.text}`}>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${c.bar} transition-all duration-500`} style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skill Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-emerald-600">{data.skills.filter(s => s.level >= 80).length}</p>
              <p className="text-xs text-emerald-700 font-medium mt-1">Expert Level Skills</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-orange-600">{data.skills.filter(s => s.level >= 65 && s.level < 80).length}</p>
              <p className="text-xs text-orange-700 font-medium mt-1">Proficient Skills</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-rose-600">{data.skills.filter(s => s.level < 65).length}</p>
              <p className="text-xs text-rose-700 font-medium mt-1">Need Improvement</p>
            </div>
          </div>
        </div>
      )}

      {/* INTERVIEWS TAB */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-5 text-center">
              <span className="text-3xl">🎤</span>
              <p className="text-2xl font-bold text-gray-800 mt-2">{data.interviews.total}</p>
              <p className="text-xs text-gray-500 mt-1">Total Sessions</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
              <span className="text-3xl">🌟</span>
              <p className="text-lg font-bold text-emerald-700 mt-2">{data.interviews.best}</p>
              <p className="text-xs text-emerald-600 mt-1">Best Domain</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-center">
              <span className="text-3xl">⚠️</span>
              <p className="text-lg font-bold text-rose-700 mt-2">{data.interviews.weak}</p>
              <p className="text-xs text-rose-600 mt-1">Needs Practice</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Weekly Performance Trend</h3>
            <div className="space-y-3">
              {data.weeklyProgress.map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-12 text-sm text-gray-500 font-medium">{w.week}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full bg-orange-500 transition-all" style={{ width: `${w.score}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{w.score}/100</span>
                  <span className="text-xs text-gray-400 w-20 text-right">{w.interviews} sessions</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROGRESS TAB */}
      {activeTab === 'progress' && (
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Activity Timeline</h3>
          <div className="space-y-3">
            {[
              { date: 'This Week', action: '5 mock interviews completed', detail: 'Resume updated, 3 applications submitted', score: '+5%' },
              { date: 'Last Week', action: '3 mock interviews completed', detail: 'ATS score improved, 2 applications submitted', score: '+3%' },
              { date: '2 Weeks Ago', action: '4 mock interviews completed', detail: 'New project added to resume', score: '+4%' },
              { date: '3 Weeks Ago', action: '2 mock interviews completed', detail: 'Profile updated with certifications', score: '+2%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-orange-50/50 hover:bg-orange-50 rounded-lg border border-orange-100 transition">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="w-28 text-sm font-medium text-gray-700">{item.date}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                </div>
                <span className="text-sm font-bold text-emerald-600">{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
