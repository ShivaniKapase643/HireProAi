import { useState } from 'react';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');

  const data = {
    interviews: { total: 18, avgScore: 72, best: 'Web Development', weak: 'System Design' },
    resume: { atsScore: 78, lastImproved: '+12 points this month' },
    applications: { total: 24, responseRate: '33%', interviewRate: '21%' },
    skills: [
      { name: 'React.js', level: 85 }, { name: 'Node.js', level: 78 }, { name: 'MongoDB', level: 72 },
      { name: 'DSA', level: 65 }, { name: 'System Design', level: 45 }, { name: 'Communication', level: 80 },
    ],
    weeklyProgress: [
      { week: 'Week 1', interviews: 2, score: 60 },
      { week: 'Week 2', interviews: 3, score: 65 },
      { week: 'Week 3', interviews: 4, score: 70 },
      { week: 'Week 4', interviews: 5, score: 72 },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics & Insights</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {['overview', 'interviews', 'skills', 'progress'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border p-5">
              <p className="text-sm text-gray-500">Placement Readiness</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">72%</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% this month</p>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <p className="text-sm text-gray-500">Interview Score Avg</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{data.interviews.avgScore}/100</p>
              <p className="text-xs text-green-600 mt-1">↑ 5 points</p>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <p className="text-sm text-gray-500">ATS Resume Score</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{data.resume.atsScore}%</p>
              <p className="text-xs text-green-600 mt-1">{data.resume.lastImproved}</p>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <p className="text-sm text-gray-500">Response Rate</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{data.applications.responseRate}</p>
              <p className="text-xs text-gray-500 mt-1">{data.applications.total} applications</p>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border p-5">
              <h3 className="font-medium text-green-700 mb-3">💪 Strengths</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>React & Frontend Development</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Communication Skills</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Problem Solving Approach</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <h3 className="font-medium text-red-700 mb-3">📈 Areas to Improve</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full"></span>System Design Knowledge</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full"></span>Advanced DSA (Graphs, DP)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full"></span>Cloud & DevOps Skills</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-medium text-gray-800 mb-4">Skill Proficiency</h3>
          <div className="space-y-4">
            {data.skills.map(skill => (
              <div key={skill.name} className="flex items-center gap-4">
                <span className="w-32 text-sm text-gray-700">{skill.name}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${skill.level >= 80 ? 'bg-green-500' : skill.level >= 60 ? 'bg-orange-400' : 'bg-red-400'}`} style={{width: `${skill.level}%`}}></div>
                </div>
                <span className="text-sm font-medium w-10">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'interviews' && (
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-medium text-gray-800 mb-4">Interview Performance</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-orange-50 rounded-lg"><p className="text-2xl font-bold text-orange-600">{data.interviews.total}</p><p className="text-xs text-gray-500">Total Interviews</p></div>
            <div className="text-center p-4 bg-green-50 rounded-lg"><p className="text-2xl font-bold text-green-600">{data.interviews.best}</p><p className="text-xs text-gray-500">Best Domain</p></div>
            <div className="text-center p-4 bg-red-50 rounded-lg"><p className="text-2xl font-bold text-red-600">{data.interviews.weak}</p><p className="text-xs text-gray-500">Needs Work</p></div>
          </div>
          <div className="space-y-2">
            {data.weeklyProgress.map(w => (
              <div key={w.week} className="flex items-center gap-4 py-2 border-b border-gray-50">
                <span className="w-20 text-sm text-gray-600">{w.week}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-orange-500" style={{width: `${w.score}%`}}></div></div>
                <span className="text-sm font-medium">{w.score}/100</span>
                <span className="text-xs text-gray-500">{w.interviews} sessions</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-medium text-gray-800 mb-4">Weekly Progress</h3>
          <div className="space-y-3">
            {[
              { date: 'This Week', action: '5 mock interviews, Resume updated, 3 applications', score: '+5%' },
              { date: 'Last Week', action: '3 mock interviews, ATS score improved, 2 applications', score: '+3%' },
              { date: '2 Weeks Ago', action: '4 mock interviews, New project added to resume', score: '+4%' },
              { date: '3 Weeks Ago', action: '2 mock interviews, Profile updated', score: '+2%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="w-28 text-sm font-medium text-gray-700">{item.date}</span>
                <span className="flex-1 text-sm text-gray-600">{item.action}</span>
                <span className="text-sm font-bold text-green-600">{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
