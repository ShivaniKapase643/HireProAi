import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [activeTab, setActiveTab] = useState('analyze'); // analyze, builder
  const [file, setFile] = useState(null);
  const [phase, setPhase] = useState('upload');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [jdText, setJdText] = useState('');
  const [jdResult, setJdResult] = useState(null);
  const [saved, setSaved] = useState(false);

  // Resume Builder State
  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
    education: [
      { id: 1, institution: '', degree: '', year: '', grade: '' },
    ],
    experience: [
      { id: 1, company: '', role: '', duration: '', points: ['', '', ''] },
    ],
    skills: { languages: '', frameworks: '', databases: '', tools: '', concepts: '' },
    projects: [
      { id: 1, title: '', tech: '', points: ['', '', ''] },
    ],
    certifications: [''],
    achievements: [''],
  });

  const [template, setTemplate] = useState('modern'); // modern, classic, minimal

  // Analyze functions
  const handleAnalyze = () => {
    if (!file) return;
    setPhase('analyzing');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) { p = 100; clearInterval(interval); setTimeout(() => { setPhase('result'); generateResult(); }, 500); }
      setProgress(Math.min(100, Math.round(p)));
    }, 300);
  };

  const generateResult = () => {
    setResult({
      atsScore: 76,
      sections: { keywords: 72, formatting: 88, experience: 62, education: 95, skills: 78, grammar: 85 },
      matchedKeywords: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'REST API', 'Git', 'Agile', 'Full Stack', 'Express'],
      missingKeywords: ['Docker', 'CI/CD', 'AWS', 'TypeScript', 'Kubernetes', 'Unit Testing', 'GraphQL', 'Redis', 'Microservices'],
      suggestions: [
        { priority: 'critical', section: 'Summary', text: 'Add a professional summary highlighting your key strengths and target role.' },
        { priority: 'critical', section: 'Achievements', text: 'Quantify achievements: "Improved performance by 40%" instead of "Improved API".' },
        { priority: 'high', section: 'Keywords', text: 'Add Docker, CI/CD, AWS — present in 80% of job descriptions.' },
        { priority: 'high', section: 'Experience', text: 'Use STAR format. Start with strong action verbs.' },
        { priority: 'medium', section: 'Format', text: 'Use consistent bullet points throughout.' },
        { priority: 'low', section: 'Certifications', text: 'Add relevant cloud certifications.' },
      ],
      grammarIssues: [
        { text: 'Responsible for building...', fix: 'Built and deployed...', type: 'Passive Voice' },
        { text: 'Worked on various projects', fix: 'Led development of 5 production apps', type: 'Vague' },
      ],
    });
  };

  const matchJD = () => {
    if (!jdText.trim()) return;
    setTimeout(() => {
      setJdResult({
        matchScore: 68,
        matchedSkills: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'REST APIs'],
        missingSkills: ['TypeScript', 'Docker', 'AWS', 'CI/CD', 'System Design'],
        recommendations: ['Add TypeScript experience', 'Include cloud deployment experience', 'Mention CI/CD pipeline work'],
      });
    }, 1000);
  };

  // Update resume builder fields
  const updateField = (field, value) => setResume({ ...resume, [field]: value });
  const updateExpPoint = (expId, pointIdx, value) => {
    setResume({ ...resume, experience: resume.experience.map(e => e.id === expId ? { ...e, points: e.points.map((p, i) => i === pointIdx ? value : p) } : e) });
  };
  const updateProjectPoint = (projId, pointIdx, value) => {
    setResume({ ...resume, projects: resume.projects.map(p => p.id === projId ? { ...p, points: p.points.map((pt, i) => i === pointIdx ? value : pt) } : p) });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Resume Module</h1>
          <p className="text-gray-500 text-sm">Analyze, build & optimize your resume</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setActiveTab('analyze')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'analyze' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'}`}>🔍 Analyze</button>
          <button onClick={() => setActiveTab('builder')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'builder' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'}`}>📝 Builder</button>
        </div>
      </div>

      {/* ===== RESUME BUILDER TAB ===== */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-2 gap-5">
          {/* Editor Panel */}
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
            <div className="bg-white rounded-xl border p-4 space-y-3">
              <h3 className="font-medium text-gray-800 text-sm">📋 Personal Info</h3>
              <div className="grid grid-cols-2 gap-2">
                <input value={resume.name} onChange={e => updateField('name', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Full Name" />
                <input value={resume.email} onChange={e => updateField('email', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Email" />
                <input value={resume.phone} onChange={e => updateField('phone', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Phone" />
                <input value={resume.location} onChange={e => updateField('location', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Location" />
                <input value={resume.linkedin} onChange={e => updateField('linkedin', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="LinkedIn" />
                <input value={resume.github} onChange={e => updateField('github', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="GitHub" />
              </div>
            </div>

            <div className="bg-white rounded-xl border p-4 space-y-2">
              <h3 className="font-medium text-gray-800 text-sm">📝 Summary</h3>
              <textarea value={resume.summary} onChange={e => updateField('summary', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" rows={3} />
            </div>

            <div className="bg-white rounded-xl border p-4 space-y-2">
              <h3 className="font-medium text-gray-800 text-sm">🎓 Education</h3>
              {resume.education.map(edu => (
                <div key={edu.id} className="grid grid-cols-2 gap-2">
                  <input value={edu.institution} onChange={e => setResume({...resume, education: resume.education.map(ed => ed.id === edu.id ? {...ed, institution: e.target.value} : ed)})} className="px-3 py-1.5 border rounded text-xs outline-none col-span-2" placeholder="Institution" />
                  <input value={edu.degree} onChange={e => setResume({...resume, education: resume.education.map(ed => ed.id === edu.id ? {...ed, degree: e.target.value} : ed)})} className="px-3 py-1.5 border rounded text-xs outline-none" placeholder="Degree" />
                  <input value={edu.year} onChange={e => setResume({...resume, education: resume.education.map(ed => ed.id === edu.id ? {...ed, year: e.target.value} : ed)})} className="px-3 py-1.5 border rounded text-xs outline-none" placeholder="Year" />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border p-4 space-y-2">
              <h3 className="font-medium text-gray-800 text-sm">💼 Experience</h3>
              {resume.experience.map(exp => (
                <div key={exp.id} className="space-y-1.5 border-b pb-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input value={exp.role} onChange={e => setResume({...resume, experience: resume.experience.map(ex => ex.id === exp.id ? {...ex, role: e.target.value} : ex)})} className="px-3 py-1.5 border rounded text-xs outline-none" placeholder="Role" />
                    <input value={exp.company} onChange={e => setResume({...resume, experience: resume.experience.map(ex => ex.id === exp.id ? {...ex, company: e.target.value} : ex)})} className="px-3 py-1.5 border rounded text-xs outline-none" placeholder="Company" />
                  </div>
                  {exp.points.map((pt, i) => (
                    <input key={i} value={pt} onChange={e => updateExpPoint(exp.id, i, e.target.value)} className="w-full px-3 py-1.5 border rounded text-xs outline-none" placeholder={`Bullet point ${i+1}`} />
                  ))}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border p-4 space-y-2">
              <h3 className="font-medium text-gray-800 text-sm">⚡ Skills</h3>
              {Object.entries(resume.skills).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-20 capitalize">{key}:</span>
                  <input value={val} onChange={e => setResume({...resume, skills: {...resume.skills, [key]: e.target.value}})} className="flex-1 px-3 py-1.5 border rounded text-xs outline-none" />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border p-4 space-y-2">
              <h3 className="font-medium text-gray-800 text-sm">🚀 Projects</h3>
              {resume.projects.map(proj => (
                <div key={proj.id} className="space-y-1.5 border-b pb-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input value={proj.title} onChange={e => setResume({...resume, projects: resume.projects.map(p => p.id === proj.id ? {...p, title: e.target.value} : p)})} className="px-3 py-1.5 border rounded text-xs outline-none" placeholder="Title" />
                    <input value={proj.tech} onChange={e => setResume({...resume, projects: resume.projects.map(p => p.id === proj.id ? {...p, tech: e.target.value} : p)})} className="px-3 py-1.5 border rounded text-xs outline-none" placeholder="Tech Stack" />
                  </div>
                  {proj.points.map((pt, i) => (
                    <input key={i} value={pt} onChange={e => updateProjectPoint(proj.id, i, e.target.value)} className="w-full px-3 py-1.5 border rounded text-xs outline-none" placeholder={`Point ${i+1}`} />
                  ))}
                </div>
              ))}
            </div>

            {/* Save all button at bottom of editor */}
            <div className="sticky bottom-0 bg-white border rounded-xl p-3 shadow-lg">
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
                {saved ? '✓ All Changes Saved!' : '💾 Save All Changes'}
              </button>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="space-y-3">
            {/* Action buttons */}
            <div className="flex gap-2">
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition text-sm">
                {saved ? '✓ Saved!' : '💾 Save Resume'}
              </button>
              <button onClick={() => {
                const printWin = window.open('', '_blank');
                const el = document.getElementById('resume-preview');
                printWin.document.write('<html><head><title>Resume - ' + resume.name + '</title><style>body{font-family:Calibri,sans-serif;padding:40px;font-size:11pt;line-height:1.4}h1{font-size:18pt;margin:0}h2{font-size:11pt;text-transform:uppercase;border-bottom:1px solid #333;padding-bottom:2px;margin:12px 0 6px}ul{margin:2px 0;padding-left:18px}li{margin:2px 0}.header{text-align:center;margin-bottom:10px}.section{margin-bottom:8px}strong{font-weight:bold}.flex{display:flex;justify-content:space-between}.text-sm{font-size:10pt}.text-gray{color:#555}</style></head><body>');
                printWin.document.write(el.innerHTML);
                printWin.document.write('</body></html>');
                printWin.document.close();
                setTimeout(() => { printWin.print(); }, 500);
              }} className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition text-sm">
                📄 Generate PDF
              </button>
            </div>

            <div id="resume-preview" className="bg-white rounded-xl border p-6 max-h-[70vh] overflow-y-auto shadow-sm" style={{fontFamily: 'Calibri, sans-serif'}}>
            <div className="text-center border-b pb-3 mb-3">
              <h1 className="text-xl font-bold text-gray-900">{resume.name}</h1>
              <p className="text-xs text-gray-600 mt-1">{resume.email} | {resume.phone} | {resume.location}</p>
              <p className="text-xs text-blue-600">{resume.linkedin} | {resume.github}</p>
            </div>

            {resume.summary && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-300 pb-0.5 mb-1">Professional Summary</h2>
                <p className="text-xs text-gray-700 leading-relaxed">{resume.summary}</p>
              </div>
            )}

            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-300 pb-0.5 mb-1">Education</h2>
              {resume.education.map(edu => (
                <div key={edu.id} className="flex justify-between mb-1">
                  <div><p className="text-xs font-semibold text-gray-800">{edu.degree}</p><p className="text-xs text-gray-600">{edu.institution}</p></div>
                  <p className="text-xs text-gray-500">{edu.year} | {edu.grade}</p>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-300 pb-0.5 mb-1">Experience</h2>
              {resume.experience.map(exp => (
                <div key={exp.id} className="mb-2">
                  <div className="flex justify-between"><p className="text-xs font-semibold">{exp.role} — {exp.company}</p><p className="text-xs text-gray-500">{exp.duration}</p></div>
                  <ul className="list-disc list-inside mt-0.5">{exp.points.map((p, i) => <li key={i} className="text-xs text-gray-700">{p}</li>)}</ul>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-300 pb-0.5 mb-1">Technical Skills</h2>
              {Object.entries(resume.skills).map(([key, val]) => (
                <p key={key} className="text-xs text-gray-700"><strong className="capitalize">{key}:</strong> {val}</p>
              ))}
            </div>

            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-300 pb-0.5 mb-1">Projects</h2>
              {resume.projects.map(proj => (
                <div key={proj.id} className="mb-2">
                  <p className="text-xs"><strong>{proj.title}</strong> <span className="text-gray-500">| {proj.tech}</span></p>
                  <ul className="list-disc list-inside">{proj.points.map((p, i) => <li key={i} className="text-xs text-gray-700">{p}</li>)}</ul>
                </div>
              ))}
            </div>

            {resume.certifications.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-300 pb-0.5 mb-1">Certifications</h2>
                <ul className="list-disc list-inside">{resume.certifications.map((c, i) => <li key={i} className="text-xs text-gray-700">{c}</li>)}</ul>
              </div>
            )}

            {resume.achievements.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-300 pb-0.5 mb-1">Achievements</h2>
                <ul className="list-disc list-inside">{resume.achievements.map((a, i) => <li key={i} className="text-xs text-gray-700">{a}</li>)}</ul>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      {/* ===== ANALYZE TAB ===== */}
      {activeTab === 'analyze' && phase === 'upload' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-orange-400 transition cursor-pointer" onClick={() => document.getElementById('file-input').click()}>
              <div className="text-5xl mb-4">📄</div>
              <p className="text-gray-700 font-medium text-lg">Drop your resume here</p>
              <p className="text-gray-400 text-sm mb-4">PDF or DOCX • Max 5MB</p>
              <input type="file" id="file-input" accept=".pdf,.docx" onChange={e => setFile(e.target.files[0])} className="hidden" />
              <div className="inline-block px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium">Choose File</div>
              {file && <p className="mt-3 text-sm text-green-600 font-medium">✓ {file.name}</p>}
            </div>
            <button onClick={handleAnalyze} disabled={!file} className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-lg disabled:opacity-40 transition text-lg">🔍 Analyze Resume</button>
          </div>
        </div>
      )}

      {activeTab === 'analyze' && phase === 'analyzing' && (
        <div className="max-w-lg mx-auto mt-20 text-center space-y-6">
          <div className="text-5xl animate-bounce">🤖</div>
          <h2 className="text-xl font-bold text-gray-800">Analyzing Your Resume...</h2>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="h-3 rounded-full bg-orange-500 transition-all" style={{width: `${progress}%`}}></div></div>
          <p className="text-sm text-gray-500">{progress < 30 ? 'Parsing...' : progress < 60 ? 'Analyzing keywords...' : progress < 90 ? 'Scoring...' : 'Done!'}</p>
        </div>
      )}

      {activeTab === 'analyze' && phase === 'result' && result && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Analysis Report</h2>
            <button onClick={() => { setPhase('upload'); setFile(null); }} className="text-sm text-orange-600 font-medium">← New Analysis</button>
          </div>

          {/* Score */}
          <div className="bg-white rounded-xl border p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ATS Score</p>
              <p className={`text-5xl font-bold ${result.atsScore >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{result.atsScore}/100</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(result.sections).slice(0,6).map(([k, v]) => (
                <div key={k} className="text-center">
                  <p className="text-sm font-bold">{v}%</p>
                  <p className="text-xs text-gray-500 capitalize">{k}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border p-4">
              <h4 className="font-medium text-green-700 text-sm mb-2">✓ Matched ({result.matchedKeywords.length})</h4>
              <div className="flex flex-wrap gap-1.5">{result.matchedKeywords.map(k => <span key={k} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">{k}</span>)}</div>
            </div>
            <div className="bg-white rounded-xl border p-4">
              <h4 className="font-medium text-red-700 text-sm mb-2">✗ Missing ({result.missingKeywords.length})</h4>
              <div className="flex flex-wrap gap-1.5">{result.missingKeywords.map(k => <span key={k} className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-full border border-red-200">{k}</span>)}</div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-xl border p-4">
            <h4 className="font-medium text-gray-800 text-sm mb-2">Recommendations</h4>
            {result.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <span className={`px-1.5 py-0.5 text-xs rounded ${s.priority === 'critical' ? 'bg-red-100 text-red-700' : s.priority === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{s.priority}</span>
                <p className="text-sm text-gray-700">{s.text}</p>
              </div>
            ))}
          </div>

          {/* JD Match */}
          <div className="bg-white rounded-xl border p-4">
            <h4 className="font-medium text-gray-800 text-sm mb-2">📋 Job Description Match</h4>
            <textarea value={jdText} onChange={e => setJdText(e.target.value)} placeholder="Paste job description..." className="w-full px-3 py-2 border rounded-lg text-sm outline-none resize-none" rows={3} />
            <button onClick={matchJD} disabled={!jdText.trim()} className="mt-2 px-4 py-2 bg-orange-500 text-white text-sm rounded-lg disabled:opacity-40">Match</button>
            {jdResult && (
              <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                <p className="font-bold text-orange-600 text-lg">{jdResult.matchScore}% Match</p>
                <div className="flex flex-wrap gap-1 mt-2">{jdResult.missingSkills.map(s => <span key={s} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">{s}</span>)}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
