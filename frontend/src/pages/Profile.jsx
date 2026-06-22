import { useState, useRef, useEffect } from 'react';
import api from '../services/api';

export default function Profile() {
  const [tab, setTab] = useState('overview');
  const [editing, setEditing] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [saved, setSaved] = useState('');
  const [saving, setSaving] = useState('');
  const [saveError, setSaveError] = useState('');
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: '', email: '', phone: '',
    headline: '',
    summary: '',
    location: '', gender: '', dob: '',
    github: '', linkedin: '', portfolio: '',
    education: [],
    skills: { technical: [], soft: [] },
    projects: [],
    certifications: [],
    experience: [],
    goals: { short: [], long: [] },
  });

  // Load the logged-in user (incl. Google name & profile picture) and fill the profile
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/users/profile');
        const u = data?.data;
        if (!u || cancelled) return;

        const p = u.profile || {};
        const addr = p.address || {};
        const social = p.socialLinks || {};

        if (u.profilePicture) setProfilePic(u.profilePicture);

        setProfile((prev) => ({
          ...prev,
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          headline: p.headline || '',
          summary: p.summary || '',
          location: [addr.city, addr.state, addr.country].filter(Boolean).join(', '),
          gender: p.gender || '',
          github: social.github || '',
          linkedin: social.linkedin || '',
          portfolio: social.portfolio || '',
          education: (p.education || []).map((e, i) => ({
            id: e._id || Date.now() + i,
            institution: e.institution || '',
            degree: e.degree || '',
            field: e.field || '',
            year: [e.startYear, e.endYear].filter(Boolean).join('-'),
            cgpa: e.cgpa || e.percentage || '',
          })),
          skills: {
            technical: p.skills?.technical || [],
            soft: p.skills?.soft || [],
          },
          projects: (p.projects || []).map((pr, i) => ({
            id: pr._id || Date.now() + i,
            title: pr.title || '',
            tech: (pr.technologies || []).join(', '),
            desc: pr.description || '',
            link: pr.link || pr.github || '',
          })),
          goals: {
            short: u.careerGoals?.shortTerm || [],
            long: u.careerGoals?.longTerm || [],
          },
        }));
      } catch (err) {
        // Not logged in or request failed — keep empty form
        console.error('Failed to load profile', err);
      }
    })();
    return () => { cancelled = true; };
  }, []);


  // Temp edit states
  const [editForm, setEditForm] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  // Map the frontend profile state onto the backend User schema shape
  const buildProfilePayload = (p) => {
    const [city, state, country] = (p.location || '').split(',').map((s) => s.trim());
    const num = (v) => {
      const n = parseFloat(v);
      return Number.isNaN(n) ? undefined : n;
    };
    return {
      name: p.name,
      phone: p.phone,
      profile: {
        headline: p.headline,
        summary: p.summary,
        gender: p.gender || undefined,
        address: { city, state, country },
        education: (p.education || []).map((e) => {
          const [startYear, endYear] = (e.year || '').split('-').map((y) => parseInt(y.trim(), 10));
          return {
            institution: e.institution,
            degree: e.degree,
            field: e.field,
            startYear: Number.isNaN(startYear) ? undefined : startYear,
            endYear: Number.isNaN(endYear) ? undefined : endYear,
            cgpa: num(e.cgpa),
          };
        }),
        skills: { technical: p.skills?.technical || [], soft: p.skills?.soft || [] },
        projects: (p.projects || []).map((pr) => ({
          title: pr.title,
          description: pr.desc,
          technologies: (pr.tech || '').split(',').map((t) => t.trim()).filter(Boolean),
          link: pr.link,
        })),
        experience: (p.experience || []).map((ex) => ({
          company: ex.company,
          role: ex.role,
          type: ex.type,
          description: ex.description,
          current: ex.current,
        })),
        certifications: (p.certifications || []).map((c) => ({
          title: c.title,
          issuer: c.issuer,
          url: c.credentialUrl,
        })),
        socialLinks: { github: p.github, linkedin: p.linkedin, portfolio: p.portfolio },
      },
      'careerGoals.shortTerm': (p.goals?.short || []).filter(Boolean),
      'careerGoals.longTerm': (p.goals?.long || []).filter(Boolean),
    };
  };

  // Persist the given profile object to the backend
  const persistProfile = async (p, section) => {
    setSaving(section || 'all');
    setSaveError('');
    try {
      await api.put('/users/profile', buildProfilePayload(p));
      setSaved(section || 'all');
      setTimeout(() => setSaved(''), 2000);
    } catch (err) {
      console.error('Failed to save profile', err);
      setSaveError(err.response?.data?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB'); return; }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result;
      setProfilePic(dataUrl); // instant preview
      try {
        await api.put('/users/profile/picture', { image: dataUrl });
      } catch (err) {
        console.error('Failed to upload picture', err);
        setSaveError('Failed to save photo. Please try again.');
      }
    };
    reader.readAsDataURL(file);
  };

  const startEdit = (section) => {
    setEditing(section);
    setEditForm({ ...profile });
  };

  const saveEdit = async () => {
    const merged = { ...profile, ...editForm };
    setProfile(merged);
    setEditing(null);
    await persistProfile(merged, 'personal');
  };

  const cancelEdit = () => { setEditing(null); setEditForm({}); };

  const addSkill = (type) => {
    const skill = type === 'technical' ? newSkill : newSoftSkill;
    if (!skill.trim()) return;
    setProfile({ ...profile, skills: { ...profile.skills, [type]: [...profile.skills[type], skill.trim()] } });
    type === 'technical' ? setNewSkill('') : setNewSoftSkill('');
  };

  const removeSkill = (type, index) => {
    const updated = [...profile.skills[type]];
    updated.splice(index, 1);
    setProfile({ ...profile, skills: { ...profile.skills, [type]: updated } });
  };

  const addProject = () => {
    setProfile({ ...profile, projects: [...profile.projects, { id: Date.now(), title: '', tech: '', desc: '', link: '' }] });
  };

  const updateProject = (id, field, value) => {
    setProfile({ ...profile, projects: profile.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  const removeProject = (id) => {
    setProfile({ ...profile, projects: profile.projects.filter(p => p.id !== id) });
  };

  const addEducation = () => {
    setProfile({ ...profile, education: [...profile.education, { id: Date.now(), institution: '', degree: '', field: '', year: '', cgpa: '' }] });
  };

  const updateEducation = (id, field, value) => {
    setProfile({ ...profile, education: profile.education.map(e => e.id === id ? { ...e, [field]: value } : e) });
  };

  const removeEducation = (id) => {
    setProfile({ ...profile, education: profile.education.filter(e => e.id !== id) });
  };

  const saveSection = (section) => {
    persistProfile(profile, section);
  };

  const completion = () => {
    let score = 0;
    if (profile.name) score += 10;
    if (profile.email) score += 10;
    if (profile.phone) score += 10;
    if (profilePic) score += 10;
    if (profile.summary) score += 10;
    if (profile.education.length > 0) score += 10;
    if (profile.skills.technical.length >= 3) score += 10;
    if (profile.projects.length >= 2) score += 10;
    if (profile.certifications.length > 0) score += 10;
    if (profile.goals.short.length > 0) score += 10;
    return score;
  };

  const tabs = ['overview', 'education', 'skills', 'projects', 'experience', 'certifications', 'career'];

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
          <span>⚠️ {saveError}</span>
          <button onClick={() => setSaveError('')} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}
      {/* Profile Header with Image Upload */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-start gap-5">
          {/* Profile Picture Upload */}
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg cursor-pointer" onClick={() => fileInputRef.current.click()}>
              {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : profile.name.charAt(0)}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <span className="text-white text-xs font-medium">📷 Edit</span>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          <div className="flex-1">
            {editing === 'personal' ? (
              <div className="space-y-2">
                <input value={editForm.name || profile.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="text-xl font-bold border-b border-orange-300 outline-none w-full" placeholder="Full Name" />
                <input value={editForm.headline || profile.headline} onChange={e => setEditForm({...editForm, headline: e.target.value})} className="text-sm border-b border-gray-200 outline-none w-full" placeholder="e.g., Full Stack Developer | MERN Stack" />
                <div className="grid grid-cols-3 gap-2">
                  <input value={editForm.email || profile.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="text-xs border rounded px-2 py-1 outline-none" placeholder="Email" />
                  <input value={editForm.phone || profile.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="text-xs border rounded px-2 py-1 outline-none" placeholder="Phone" />
                  <input value={editForm.location || profile.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="text-xs border rounded px-2 py-1 outline-none" placeholder="Location" />
                </div>
                <textarea value={editForm.summary || profile.summary} onChange={e => setEditForm({...editForm, summary: e.target.value})} className="text-sm border rounded px-2 py-1 outline-none w-full" rows={2} placeholder="Professional Summary (2-3 lines about yourself)" />
                <div className="grid grid-cols-3 gap-2">
                  <input value={editForm.github || profile.github} onChange={e => setEditForm({...editForm, github: e.target.value})} className="text-xs border rounded px-2 py-1 outline-none" placeholder="GitHub URL" />
                  <input value={editForm.linkedin || profile.linkedin} onChange={e => setEditForm({...editForm, linkedin: e.target.value})} className="text-xs border rounded px-2 py-1 outline-none" placeholder="LinkedIn URL" />
                  <input value={editForm.portfolio || profile.portfolio} onChange={e => setEditForm({...editForm, portfolio: e.target.value})} className="text-xs border rounded px-2 py-1 outline-none" placeholder="Portfolio URL" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={saveEdit} className="px-4 py-1.5 bg-orange-500 text-white text-xs rounded-lg font-medium hover:bg-orange-600">💾 Save</button>
                  <button onClick={cancelEdit} className="px-4 py-1.5 border text-xs rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-800">{profile.name || <span className="text-gray-400 italic">Add your name</span>}</h1>
                  <button onClick={() => startEdit('personal')} className="text-xs text-orange-600 hover:text-orange-700 font-medium">✏️ Edit</button>
                </div>
                {profile.headline ? (
                  <p className="text-sm text-orange-600 font-medium">{profile.headline}</p>
                ) : (
                  <p className="text-sm text-gray-400 italic">Add a headline (e.g., "Full Stack Developer | AI Enthusiast")</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {profile.location && <>📍 {profile.location} • </>}
                  {profile.email && <>📧 {profile.email}</>}
                  {profile.phone && <> • 📱 {profile.phone}</>}
                </p>
                {(profile.github || profile.linkedin || profile.portfolio) && (
                  <div className="flex gap-3 mt-2">
                    {profile.github && <a href="#" className="text-xs text-blue-600 hover:underline">🔗 GitHub</a>}
                    {profile.linkedin && <a href="#" className="text-xs text-blue-600 hover:underline">🔗 LinkedIn</a>}
                    {profile.portfolio && <a href="#" className="text-xs text-blue-600 hover:underline">🌐 Portfolio</a>}
                  </div>
                )}
                {profile.summary && <p className="text-sm text-gray-600 mt-3 border-t pt-3">{profile.summary}</p>}
              </>
            )}
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Profile Score</p>
            <p className="text-3xl font-bold text-orange-600">{completion()}%</p>
            <div className="w-28 bg-gray-200 rounded-full h-2 mt-1"><div className="h-2 rounded-full bg-orange-500 transition-all" style={{width:`${completion()}%`}}></div></div>
            {completion() < 100 && <p className="text-xs text-orange-500 mt-1">Complete profile to 100%</p>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${tab === t ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border p-6">

        {/* EDUCATION TAB - Editable */}
        {tab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Education</h3>
              <button onClick={addEducation} className="px-3 py-1.5 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600">+ Add</button>
            </div>
            {profile.education.map((edu) => (
              <div key={edu.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg">🎓</div>
                  <button onClick={() => removeEducation(edu.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Institution Name" />
                  <input value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Degree (B.Tech, HSC...)" />
                  <input value={edu.field} onChange={e => updateEducation(edu.id, 'field', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Field of Study" />
                  <input value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Year (2022-2026)" />
                  <input value={edu.cgpa} onChange={e => updateEducation(edu.id, 'cgpa', e.target.value)} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="CGPA / Percentage" />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t">
              <button onClick={() => saveSection('education')} className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">💾 Save Education</button>
              {saved === 'education' && <span className="text-green-600 text-sm font-medium animate-pulse">✓ Saved successfully!</span>}
            </div>
          </div>
        )}

        {/* SKILLS TAB - Editable */}
        {tab === 'skills' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.skills.technical.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-orange-50 text-orange-700 text-sm rounded-lg border border-orange-200 flex items-center gap-1.5">
                    {s}
                    <button onClick={() => removeSkill('technical', i)} className="text-orange-400 hover:text-red-500 text-xs ml-1">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill('technical')} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 flex-1" placeholder="Add skill (e.g. Docker, AWS, Next.js)" />
                <button onClick={() => addSkill('technical')} className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600">Add</button>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Soft Skills</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.skills.soft.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-200 flex items-center gap-1.5">
                    {s}
                    <button onClick={() => removeSkill('soft', i)} className="text-blue-400 hover:text-red-500 text-xs ml-1">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newSoftSkill} onChange={e => setNewSoftSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill('soft')} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 flex-1" placeholder="Add soft skill" />
                <button onClick={() => addSkill('soft')} className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">Add</button>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t">
              <button onClick={() => saveSection('skills')} className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">💾 Save Skills</button>
              {saved === 'skills' && <span className="text-green-600 text-sm font-medium animate-pulse">✓ Saved successfully!</span>}
            </div>
          </div>
        )}

        {/* PROJECTS TAB - Editable */}
        {tab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Projects ({profile.projects.length})</h3>
              <button onClick={addProject} className="px-3 py-1.5 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600">+ Add Project</button>
            </div>
            {profile.projects.map((p) => (
              <div key={p.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Project</span>
                  <button onClick={() => removeProject(p.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                </div>
                <input value={p.title} onChange={e => updateProject(p.id, 'title', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Project Title" />
                <input value={p.tech} onChange={e => updateProject(p.id, 'tech', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Technologies (React, Node.js, MongoDB...)" />
                <textarea value={p.desc} onChange={e => updateProject(p.id, 'desc', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" rows={2} placeholder="Description" />
                <input value={p.link} onChange={e => updateProject(p.id, 'link', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="GitHub / Live Link" />
              </div>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t">
              <button onClick={() => saveSection('projects')} className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">💾 Save Projects</button>
              {saved === 'projects' && <span className="text-green-600 text-sm font-medium animate-pulse">✓ Saved successfully!</span>}
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {tab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Work Experience & Internships</h3>
              <button onClick={() => setProfile({...profile, experience: [...profile.experience, { id: Date.now(), company: '', role: '', type: 'internship', startDate: '', endDate: '', description: '', current: false }]})} className="px-3 py-1.5 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600">+ Add Experience</button>
            </div>
            {profile.experience.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-3xl mb-2">💼</p>
                <p className="text-gray-500 text-sm">No experience added yet</p>
                <p className="text-gray-400 text-xs mt-1">Add internships, part-time jobs, freelance work</p>
              </div>
            )}
            {profile.experience.map((exp) => (
              <div key={exp.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg">💼</span>
                  <button onClick={() => setProfile({...profile, experience: profile.experience.filter(e => e.id !== exp.id)})} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input value={exp.company} onChange={e => setProfile({...profile, experience: profile.experience.map(ex => ex.id === exp.id ? {...ex, company: e.target.value} : ex)})} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Company Name" />
                  <input value={exp.role} onChange={e => setProfile({...profile, experience: profile.experience.map(ex => ex.id === exp.id ? {...ex, role: e.target.value} : ex)})} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Role / Designation" />
                  <select value={exp.type} onChange={e => setProfile({...profile, experience: profile.experience.map(ex => ex.id === exp.id ? {...ex, type: e.target.value} : ex)})} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="internship">Internship</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="freelance">Freelance</option>
                  </select>
                  <div className="flex gap-2">
                    <input value={exp.startDate} onChange={e => setProfile({...profile, experience: profile.experience.map(ex => ex.id === exp.id ? {...ex, startDate: e.target.value} : ex)})} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Start (e.g. Jan 2026)" />
                    <input value={exp.endDate} onChange={e => setProfile({...profile, experience: profile.experience.map(ex => ex.id === exp.id ? {...ex, endDate: e.target.value} : ex)})} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="End (or Present)" />
                  </div>
                </div>
                <textarea value={exp.description} onChange={e => setProfile({...profile, experience: profile.experience.map(ex => ex.id === exp.id ? {...ex, description: e.target.value} : ex)})} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" rows={2} placeholder="Describe your work, responsibilities & achievements..." />
              </div>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t">
              <button onClick={() => saveSection('experience')} className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">💾 Save Experience</button>
              {saved === 'experience' && <span className="text-green-600 text-sm font-medium animate-pulse">✓ Saved!</span>}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {tab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Certifications & Achievements</h3>
              <button onClick={() => setProfile({...profile, certifications: [...profile.certifications, { id: Date.now(), title: '', issuer: '', date: '', credentialUrl: '' }]})} className="px-3 py-1.5 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600">+ Add Certification</button>
            </div>
            {profile.certifications.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-3xl mb-2">🏆</p>
                <p className="text-gray-500 text-sm">No certifications added yet</p>
                <p className="text-gray-400 text-xs mt-1">Add certifications, online courses & achievements</p>
              </div>
            )}
            {profile.certifications.map((c) => (
              <div key={c.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg">🏆</span>
                  <button onClick={() => setProfile({...profile, certifications: profile.certifications.filter(cert => cert.id !== c.id)})} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input value={c.title || ''} onChange={e => setProfile({...profile, certifications: profile.certifications.map(cert => cert.id === c.id ? {...cert, title: e.target.value} : cert)})} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Certificate Title" />
                  <input value={c.issuer || ''} onChange={e => setProfile({...profile, certifications: profile.certifications.map(cert => cert.id === c.id ? {...cert, issuer: e.target.value} : cert)})} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Issuing Organization" />
                  <input value={c.date || ''} onChange={e => setProfile({...profile, certifications: profile.certifications.map(cert => cert.id === c.id ? {...cert, date: e.target.value} : cert)})} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Date (e.g. June 2026)" />
                  <input value={c.credentialUrl || ''} onChange={e => setProfile({...profile, certifications: profile.certifications.map(cert => cert.id === c.id ? {...cert, credentialUrl: e.target.value} : cert)})} className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Credential URL (optional)" />
                </div>
                
                {/* File Upload Section */}
                <div className="border-t pt-3 mt-2">
                  {c.file ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2.5">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-lg">{c.fileType === 'pdf' ? '📄' : '🖼️'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-green-800 truncate">{c.fileName}</p>
                          <p className="text-[10px] text-green-600">{c.fileSize}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => window.open(c.file, '_blank')} className="text-xs text-blue-600 hover:text-blue-700 font-medium">View</button>
                        <button onClick={() => setProfile({...profile, certifications: profile.certifications.map(cert => cert.id === c.id ? {...cert, file: null, fileName: null, fileType: null, fileSize: null} : cert)})} className="text-xs text-red-600 hover:text-red-700 font-medium">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-orange-400 rounded-lg p-3 cursor-pointer transition group">
                      <span className="text-base">📎</span>
                      <span className="text-xs text-gray-500 group-hover:text-orange-600">Upload Certificate (PDF, PNG, JPG)</span>
                      <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" className="hidden" onChange={e => {
                        const f = e.target.files[0];
                        if (!f) return;
                        if (f.size > 5 * 1024 * 1024) { alert('File size must be under 5MB'); return; }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const ext = f.name.split('.').pop().toLowerCase();
                          setProfile({...profile, certifications: profile.certifications.map(cert => cert.id === c.id ? {
                            ...cert,
                            file: reader.result,
                            fileName: f.name,
                            fileType: ext === 'pdf' ? 'pdf' : 'image',
                            fileSize: (f.size / 1024).toFixed(0) + ' KB',
                          } : cert)});
                        };
                        reader.readAsDataURL(f);
                      }} />
                    </label>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t">
              <button onClick={() => saveSection('certifications')} className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">💾 Save Certifications</button>
              {saved === 'certifications' && <span className="text-green-600 text-sm font-medium animate-pulse">✓ Saved!</span>}
            </div>
          </div>
        )}

        {/* CAREER TAB */}
        {tab === 'career' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">🎯 Short-term Goals</h3>
                <button onClick={() => setProfile({...profile, goals: {...profile.goals, short: [...profile.goals.short, '']}})} className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-lg hover:bg-orange-200">+ Add Goal</button>
              </div>
              {profile.goals.short.length === 0 && <p className="text-gray-400 text-sm italic">No short-term goals added. What do you want to achieve in the next 6 months?</p>}
              <div className="space-y-2">
                {profile.goals.short.map((g, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                    <input value={g} onChange={e => { const updated = [...profile.goals.short]; updated[i] = e.target.value; setProfile({...profile, goals: {...profile.goals, short: updated}}); }} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. Get placed at a product-based company" />
                    <button onClick={() => setProfile({...profile, goals: {...profile.goals, short: profile.goals.short.filter((_, idx) => idx !== i)}})} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">🚀 Long-term Vision</h3>
                <button onClick={() => setProfile({...profile, goals: {...profile.goals, long: [...profile.goals.long, '']}})} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200">+ Add Vision</button>
              </div>
              {profile.goals.long.length === 0 && <p className="text-gray-400 text-sm italic">No long-term goals added. Where do you see yourself in 5 years?</p>}
              <div className="space-y-2">
                {profile.goals.long.map((g, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                    <input value={g} onChange={e => { const updated = [...profile.goals.long]; updated[i] = e.target.value; setProfile({...profile, goals: {...profile.goals, long: updated}}); }} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Become a senior software architect" />
                    <button onClick={() => setProfile({...profile, goals: {...profile.goals, long: profile.goals.long.filter((_, idx) => idx !== i)}})} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t">
              <button onClick={() => saveSection('career')} className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">💾 Save Career Goals</button>
              {saved === 'career' && <span className="text-green-600 text-sm font-medium animate-pulse">✓ Saved!</span>}
            </div>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="space-y-4">
            {/* Empty profile prompt */}
            {!profile.summary && profile.skills.technical.length === 0 && profile.projects.length === 0 && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-dashed border-orange-300 rounded-xl p-8 text-center">
                <div className="text-5xl mb-3">👋</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Welcome! Let's build your profile</h3>
                <p className="text-sm text-gray-600 mb-4">Complete your profile to get personalized AI recommendations, accurate ATS scoring, and the best job matches.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button onClick={() => setTab('education')} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg font-medium">Add Education</button>
                  <button onClick={() => setTab('skills')} className="px-4 py-2 bg-white border border-orange-300 text-orange-600 text-sm rounded-lg font-medium hover:bg-orange-50">Add Skills</button>
                  <button onClick={() => setTab('projects')} className="px-4 py-2 bg-white border border-orange-300 text-orange-600 text-sm rounded-lg font-medium hover:bg-orange-50">Add Projects</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">📝 About</h3>
                    {!profile.summary && <button onClick={() => startEdit('personal')} className="text-xs text-orange-600 hover:text-orange-700 font-medium">+ Add Summary</button>}
                  </div>
                  <p className="text-sm text-gray-600">{profile.summary || <span className="italic text-gray-400">Click "Edit" above to add a professional summary that highlights your strengths and goals.</span>}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">⚡ Top Skills</h3>
                    <button onClick={() => setTab('skills')} className="text-xs text-orange-600 hover:text-orange-700 font-medium">{profile.skills.technical.length === 0 ? '+ Add Skills' : 'Manage'}</button>
                  </div>
                  {profile.skills.technical.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">No skills added. Add at least 5 technical skills to improve your profile.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">{profile.skills.technical.slice(0,8).map(s => <span key={s} className="px-2.5 py-1 bg-orange-50 text-orange-700 text-xs rounded-lg border border-orange-200">{s}</span>)}</div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">🚀 Latest Project</h3>
                    <button onClick={() => setTab('projects')} className="text-xs text-orange-600 hover:text-orange-700 font-medium">{profile.projects.length === 0 ? '+ Add Project' : 'View All'}</button>
                  </div>
                  {profile.projects.length === 0 ? (
                    <div className="border border-dashed rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-400 italic">No projects yet. Showcase your work by adding projects with descriptions and tech stack.</p>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-3">
                      <p className="font-medium text-gray-800">{profile.projects[0]?.title || 'Untitled Project'}</p>
                      {profile.projects[0]?.tech && <p className="text-xs text-orange-600">{profile.projects[0].tech}</p>}
                      {profile.projects[0]?.desc && <p className="text-sm text-gray-600 mt-1">{profile.projects[0].desc}</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 text-sm mb-3">📊 Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-600">Skills</span><span className="font-bold">{profile.skills.technical.length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Projects</span><span className="font-bold">{profile.projects.length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Experience</span><span className="font-bold">{profile.experience?.length || 0}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Certifications</span><span className="font-bold">{profile.certifications.length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Education</span><span className="font-bold">{profile.education.length}</span></div>
                  </div>
                </div>

                {/* Profile completion checklist */}
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 text-sm mb-3">✅ Profile Checklist</h4>
                  <ul className="space-y-1.5 text-xs">
                    {[
                      { check: !!profile.name, label: 'Add your name' },
                      { check: !!profile.summary, label: 'Write a summary' },
                      { check: profile.education.length > 0, label: 'Add education' },
                      { check: profile.skills.technical.length >= 3, label: 'Add 3+ skills' },
                      { check: profile.projects.length > 0, label: 'Add a project' },
                      { check: profile.certifications.length > 0, label: 'Add certifications' },
                    ].map((item, i) => (
                      <li key={i} className={`flex items-center gap-2 ${item.check ? 'text-green-600' : 'text-gray-500'}`}>
                        <span>{item.check ? '✓' : '○'}</span>
                        <span className={item.check ? 'line-through' : ''}>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
