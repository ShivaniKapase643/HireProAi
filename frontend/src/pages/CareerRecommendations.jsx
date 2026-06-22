import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CareerRecommendations() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('paths');
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  const careerPaths = [
    {
      title: 'Full Stack Developer',
      match: 92,
      avgSalary: '₹8-25 LPA',
      growth: 'High',
      demand: 'Very High',
      icon: '💻',
      color: 'orange',
      requiredSkills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Git'],
      missingSkills: ['Docker', 'AWS'],
      timeline: '6-12 months',
      description: 'Build end-to-end web applications. Perfect match for your current skill set.',
      companies: ['Google', 'Microsoft', 'Razorpay', 'Swiggy', 'PhonePe'],
    },
    {
      title: 'Frontend Engineer',
      match: 88,
      avgSalary: '₹7-22 LPA',
      growth: 'High',
      demand: 'High',
      icon: '🎨',
      color: 'blue',
      requiredSkills: ['React.js', 'JavaScript', 'CSS', 'TypeScript'],
      missingSkills: ['Next.js', 'Performance Optimization'],
      timeline: '3-6 months',
      description: 'Specialize in user interfaces and user experience design.',
      companies: ['Meta', 'Adobe', 'Atlassian', 'Zomato', 'Flipkart'],
    },
    {
      title: 'AI/ML Engineer',
      match: 65,
      avgSalary: '₹12-35 LPA',
      growth: 'Very High',
      demand: 'Very High',
      icon: '🤖',
      color: 'purple',
      requiredSkills: ['Python', 'JavaScript'],
      missingSkills: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Statistics'],
      timeline: '12-18 months',
      description: 'Build intelligent systems and machine learning models.',
      companies: ['OpenAI', 'Google DeepMind', 'Microsoft Research', 'Adobe AI', 'NVIDIA'],
    },
    {
      title: 'Backend Engineer',
      match: 78,
      avgSalary: '₹8-28 LPA',
      growth: 'High',
      demand: 'High',
      icon: '⚙️',
      color: 'green',
      requiredSkills: ['Node.js', 'MongoDB', 'REST APIs'],
      missingSkills: ['Microservices', 'System Design', 'Redis', 'Kafka'],
      timeline: '6-9 months',
      description: 'Design scalable server-side systems and APIs.',
      companies: ['Amazon', 'Netflix', 'Uber', 'Airbnb', 'Stripe'],
    },
    {
      title: 'DevOps Engineer',
      match: 45,
      avgSalary: '₹10-30 LPA',
      growth: 'Very High',
      demand: 'High',
      icon: '🔧',
      color: 'red',
      requiredSkills: ['Git', 'Linux'],
      missingSkills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
      timeline: '12-18 months',
      description: 'Automate deployment pipelines and manage cloud infrastructure.',
      companies: ['AWS', 'Google Cloud', 'HashiCorp', 'Red Hat', 'Atlassian'],
    },
    {
      title: 'Data Analyst',
      match: 60,
      avgSalary: '₹6-18 LPA',
      growth: 'Medium',
      demand: 'High',
      icon: '📊',
      color: 'yellow',
      requiredSkills: ['Python', 'SQL'],
      missingSkills: ['Power BI', 'Tableau', 'Statistics', 'Excel Advanced'],
      timeline: '6-12 months',
      description: 'Transform data into actionable business insights.',
      companies: ['Deloitte', 'PwC', 'EY', 'Accenture', 'KPMG'],
    },
    {
      title: 'Mobile App Developer',
      match: 70,
      avgSalary: '₹7-22 LPA',
      growth: 'High',
      demand: 'High',
      icon: '📱',
      color: 'blue',
      requiredSkills: ['JavaScript', 'React.js'],
      missingSkills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      timeline: '6-9 months',
      description: 'Build native and cross-platform mobile applications for iOS and Android.',
      companies: ['Swiggy', 'Zomato', 'Paytm', 'Ola', 'CRED'],
    },
    {
      title: 'Cybersecurity Analyst',
      match: 40,
      avgSalary: '₹9-30 LPA',
      growth: 'Very High',
      demand: 'Very High',
      icon: '🔒',
      color: 'red',
      requiredSkills: ['Linux', 'Networking'],
      missingSkills: ['Ethical Hacking', 'Penetration Testing', 'OWASP', 'SIEM Tools', 'Cryptography'],
      timeline: '12-18 months',
      description: 'Protect organizations from cyber threats and security vulnerabilities.',
      companies: ['Wipro', 'Infosys', 'IBM Security', 'Palo Alto Networks', 'CrowdStrike'],
    },
    {
      title: 'Cloud Engineer',
      match: 55,
      avgSalary: '₹10-32 LPA',
      growth: 'Very High',
      demand: 'Very High',
      icon: '☁️',
      color: 'blue',
      requiredSkills: ['Linux', 'Networking', 'Git'],
      missingSkills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'CloudFormation'],
      timeline: '9-15 months',
      description: 'Design and manage cloud infrastructure on AWS, Azure, or GCP.',
      companies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Oracle', 'IBM Cloud'],
    },
    {
      title: 'UI/UX Designer',
      match: 62,
      avgSalary: '₹6-20 LPA',
      growth: 'High',
      demand: 'High',
      icon: '🎨',
      color: 'purple',
      requiredSkills: ['CSS', 'HTML'],
      missingSkills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping'],
      timeline: '6-12 months',
      description: 'Design intuitive and beautiful user experiences for digital products.',
      companies: ['Adobe', 'Razorpay', 'CRED', 'Zomato', 'Headout'],
    },
    {
      title: 'Game Developer',
      match: 35,
      avgSalary: '₹6-25 LPA',
      growth: 'Medium',
      demand: 'Medium',
      icon: '🎮',
      color: 'green',
      requiredSkills: ['JavaScript'],
      missingSkills: ['Unity', 'Unreal Engine', 'C#', 'C++', '3D Mathematics', 'Game Physics'],
      timeline: '12-24 months',
      description: 'Create immersive games for PC, mobile, and console platforms.',
      companies: ['Dream11', 'Nazara Games', 'Mobile Premier League', 'Octro', 'Rovio'],
    },
    {
      title: 'Blockchain Developer',
      match: 38,
      avgSalary: '₹12-40 LPA',
      growth: 'Very High',
      demand: 'High',
      icon: '⛓️',
      color: 'orange',
      requiredSkills: ['JavaScript', 'Node.js'],
      missingSkills: ['Solidity', 'Web3.js', 'Smart Contracts', 'Ethereum', 'Cryptography'],
      timeline: '12-18 months',
      description: 'Build decentralized applications and smart contracts on blockchain platforms.',
      companies: ['Polygon', 'CoinDCX', 'WazirX', 'Coinbase', 'Consensys'],
    },
    {
      title: 'QA / Test Automation Engineer',
      match: 68,
      avgSalary: '₹6-20 LPA',
      growth: 'Medium',
      demand: 'High',
      icon: '🧪',
      color: 'green',
      requiredSkills: ['JavaScript', 'Git'],
      missingSkills: ['Selenium', 'Cypress', 'Jest', 'Playwright', 'API Testing', 'TestNG'],
      timeline: '6-9 months',
      description: 'Ensure software quality through manual and automated testing.',
      companies: ['Tata Consultancy Services', 'Cognizant', 'Capgemini', 'Hexaware', 'Mindtree'],
    },
    {
      title: 'Data Scientist',
      match: 50,
      avgSalary: '₹10-35 LPA',
      growth: 'Very High',
      demand: 'Very High',
      icon: '🔬',
      color: 'purple',
      requiredSkills: ['Python'],
      missingSkills: ['Pandas', 'NumPy', 'Scikit-Learn', 'Statistics', 'Machine Learning', 'SQL Advanced'],
      timeline: '12-18 months',
      description: 'Extract insights from large datasets and build predictive models.',
      companies: ['Flipkart', 'Walmart Labs', 'Mu Sigma', 'Fractal Analytics', 'Tiger Analytics'],
    },
    {
      title: 'Product Manager (Tech)',
      match: 58,
      avgSalary: '₹15-45 LPA',
      growth: 'High',
      demand: 'High',
      icon: '📋',
      color: 'orange',
      requiredSkills: ['Communication', 'Analytical Thinking'],
      missingSkills: ['Product Strategy', 'Agile/Scrum', 'Roadmapping', 'A/B Testing', 'SQL', 'JIRA'],
      timeline: '12-24 months',
      description: 'Define product vision, strategy, and lead cross-functional teams to ship products.',
      companies: ['Razorpay', 'PhonePe', 'Swiggy', 'Microsoft', 'Google'],
    },
    {
      title: 'AR/VR Developer',
      match: 30,
      avgSalary: '₹8-28 LPA',
      growth: 'Very High',
      demand: 'Medium',
      icon: '🥽',
      color: 'purple',
      requiredSkills: ['JavaScript'],
      missingSkills: ['Unity 3D', 'Unreal Engine', 'C#', 'WebXR', '3D Modeling', 'Spatial Computing'],
      timeline: '12-24 months',
      description: 'Build immersive AR/VR experiences for entertainment, training, and enterprise.',
      companies: ['Meta', 'Apple', 'Microsoft HoloLens', 'Unity', 'Niantic'],
    },
  ];

  const learningResources = [
    { title: 'System Design Mastery', platform: 'Educative', duration: '40 hours', priority: 'high', skill: 'System Design', icon: '🎯' },
    { title: 'AWS Cloud Practitioner', platform: 'Coursera', duration: '30 hours', priority: 'high', skill: 'Cloud', icon: '☁️' },
    { title: 'Docker & Kubernetes', platform: 'Udemy', duration: '25 hours', priority: 'high', skill: 'DevOps', icon: '🐳' },
    { title: 'TypeScript Deep Dive', platform: 'YouTube', duration: '15 hours', priority: 'medium', skill: 'TypeScript', icon: '📘' },
    { title: 'Advanced React Patterns', platform: 'Frontend Masters', duration: '20 hours', priority: 'medium', skill: 'React', icon: '⚛️' },
    { title: 'GraphQL Complete Guide', platform: 'Apollo', duration: '12 hours', priority: 'low', skill: 'GraphQL', icon: '🔗' },
  ];

  const skillGaps = [
    { skill: 'System Design', importance: 95, current: 30, target: 80 },
    { skill: 'Docker & Containers', importance: 88, current: 20, target: 75 },
    { skill: 'AWS Cloud', importance: 85, current: 15, target: 70 },
    { skill: 'TypeScript', importance: 80, current: 50, target: 85 },
    { skill: 'CI/CD Pipelines', importance: 75, current: 25, target: 70 },
    { skill: 'Microservices', importance: 70, current: 40, target: 75 },
  ];

  const trendingRoles = [
    { role: 'AI Engineer', growth: '+45%', salary: '₹18-40 LPA', demand: '🔥🔥🔥' },
    { role: 'Full Stack Dev', growth: '+28%', salary: '₹8-25 LPA', demand: '🔥🔥' },
    { role: 'Cloud Engineer', growth: '+35%', salary: '₹12-30 LPA', demand: '🔥🔥🔥' },
    { role: 'DevOps', growth: '+32%', salary: '₹10-30 LPA', demand: '🔥🔥' },
  ];

  const colorMap = {
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🎯 Career Recommendations</h1>
          <p className="text-gray-500 text-sm mt-1">AI-powered career guidance based on your profile, skills & market trends</p>
        </div>
        <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition">
          Update Profile to Improve Matches
        </button>
      </div>

      {/* Personalized insight banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎓</div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Your Best Career Match</h2>
            <p className="text-orange-100 text-sm mt-1">Based on your skills, projects & interests, <strong>Full Stack Developer</strong> is your top match with <strong>92% compatibility</strong>. You're 6-12 months away from being interview-ready.</p>
          </div>
          <button onClick={() => setSelectedPath(careerPaths[0])} className="px-4 py-2 bg-white text-orange-600 text-sm font-medium rounded-lg whitespace-nowrap">View Roadmap →</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { key: 'paths', label: '🛤 Career Paths' },
          { key: 'gaps', label: '📊 Skill Gaps' },
          { key: 'learning', label: '📚 Learning Path' },
          { key: 'trending', label: '🔥 Market Trends' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === t.key ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* CAREER PATHS TAB */}
      {activeTab === 'paths' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {careerPaths.map((path, i) => (
            <div key={i} className="bg-white rounded-xl border p-5 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colorMap[path.color].split(' ').slice(0, 1)[0]}`}>{path.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{path.title}</h3>
                    <p className="text-xs text-gray-500">{path.timeline} to interview-ready</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${path.match >= 80 ? 'text-green-600' : path.match >= 60 ? 'text-orange-500' : 'text-gray-500'}`}>{path.match}%</p>
                  <p className="text-xs text-gray-500">Match</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{path.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-gray-500">SALARY</p>
                  <p className="text-xs font-bold text-gray-800">{path.avgSalary}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-gray-500">GROWTH</p>
                  <p className="text-xs font-bold text-green-600">{path.growth}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-gray-500">DEMAND</p>
                  <p className="text-xs font-bold text-orange-600">{path.demand}</p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div>
                  <p className="text-[10px] text-green-700 font-medium uppercase mb-1">✓ You Have</p>
                  <div className="flex flex-wrap gap-1">{path.requiredSkills.map(s => <span key={s} className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] rounded border border-green-200">{s}</span>)}</div>
                </div>
                <div>
                  <p className="text-[10px] text-red-700 font-medium uppercase mb-1">✗ Need to Learn</p>
                  <div className="flex flex-wrap gap-1">{path.missingSkills.map(s => <span key={s} className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] rounded border border-red-200">{s}</span>)}</div>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-[10px] text-gray-500 mb-1">TOP HIRING COMPANIES</p>
                <div className="flex flex-wrap gap-1">{path.companies.map(c => <span key={c} className="text-xs text-gray-700">{c}</span>).reduce((p, c) => [p, ' • ', c])}</div>
              </div>

              <button onClick={() => setSelectedPath(path)} className="w-full mt-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition">
                View Full Roadmap →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SKILL GAPS TAB */}
      {activeTab === 'gaps' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-800">Skills to Develop</h3>
                <p className="text-xs text-gray-500">Priority-ranked based on industry demand & your career goals</p>
              </div>
              <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">{skillGaps.length} gaps identified</span>
            </div>
            <div className="space-y-4">
              {skillGaps.map((gap, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{gap.skill}</h4>
                      <p className="text-xs text-gray-500">Industry importance: {gap.importance}%</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${gap.importance >= 85 ? 'bg-red-100 text-red-700' : gap.importance >= 70 ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {gap.importance >= 85 ? 'Critical' : gap.importance >= 70 ? 'High Priority' : 'Medium'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-16 text-gray-500">Current</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full"><div className="h-2 rounded-full bg-orange-400" style={{ width: `${gap.current}%` }}></div></div>
                      <span className="w-10 font-medium">{gap.current}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-16 text-gray-500">Target</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full"><div className="h-2 rounded-full bg-green-500" style={{ width: `${gap.target}%` }}></div></div>
                      <span className="w-10 font-medium text-green-600">{gap.target}%</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('learning')} className="mt-2 text-xs text-orange-600 hover:text-orange-700 font-medium">Get learning plan →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEARNING PATH TAB */}
      {activeTab === 'learning' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-bold text-gray-800 mb-4">📚 Personalized Learning Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {learningResources.map((res, i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{res.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">{res.title}</h4>
                        <p className="text-xs text-gray-500">{res.platform} • {res.duration}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${res.priority === 'high' ? 'bg-red-100 text-red-700' : res.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{res.priority}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-600">Skill: <strong>{res.skill}</strong></span>
                    <button onClick={() => setSelectedResource(res)} className="text-xs text-orange-600 hover:text-orange-700 font-medium">Start →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MARKET TRENDS TAB */}
      {activeTab === 'trending' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-bold text-gray-800 mb-4">🔥 Trending Roles in 2026</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trendingRoles.map((role, i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{role.role}</h4>
                    <span className="text-2xl">{role.demand}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-green-50 rounded p-2"><p className="text-gray-500">Growth</p><p className="font-bold text-green-600">{role.growth}</p></div>
                    <div className="bg-orange-50 rounded p-2"><p className="text-gray-500">Salary</p><p className="font-bold text-orange-600">{role.salary}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-bold text-gray-800 mb-3">💡 Market Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span>✅</span><span><strong>AI/ML roles</strong> have grown 45% YoY — fastest growing segment</span></li>
              <li className="flex items-start gap-2"><span>✅</span><span><strong>Full Stack</strong> remains the most in-demand role for freshers</span></li>
              <li className="flex items-start gap-2"><span>✅</span><span><strong>Remote work</strong> options have increased 200% post-2024</span></li>
              <li className="flex items-start gap-2"><span>✅</span><span>Companies prefer candidates with <strong>cloud skills</strong> (AWS/GCP/Azure)</span></li>
              <li className="flex items-start gap-2"><span>✅</span><span><strong>System design</strong> is now expected even from fresh graduates</span></li>
            </ul>
          </div>
        </div>
      )}

      {/* ROADMAP MODAL */}
      {selectedPath && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPath(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedPath.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedPath.title} Roadmap</h2>
                  <p className="text-xs text-gray-500">Match: {selectedPath.match}% • Timeline: {selectedPath.timeline}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPath(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>

            <div className="p-5 space-y-5">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">{selectedPath.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">📅 Step-by-Step Roadmap</h3>
                <div className="space-y-3">
                  {[
                    { phase: 'Month 1-2', title: 'Master Fundamentals', tasks: ['Strengthen ' + selectedPath.requiredSkills.slice(0, 2).join(', '), 'Build 2 small projects', 'Complete data structures basics'] },
                    { phase: 'Month 3-4', title: 'Learn Missing Skills', tasks: selectedPath.missingSkills.map(s => `Learn ${s} fundamentals`) },
                    { phase: 'Month 5-6', title: 'Build Portfolio', tasks: ['Build 2 production-ready projects', 'Deploy to cloud', 'Write technical blogs', 'Get peer reviews'] },
                    { phase: 'Month 7-9', title: 'Interview Prep', tasks: ['100+ DSA problems', 'System design basics', 'Mock interviews (3/week)', 'Behavioral questions practice'] },
                    { phase: 'Month 10-12', title: 'Apply & Network', tasks: ['Update resume & LinkedIn', 'Apply to 50+ companies', 'Attend tech meetups', 'Get referrals'] },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i+1}</div>
                        {i < 4 && <div className="w-0.5 flex-1 bg-orange-200 my-1"></div>}
                      </div>
                      <div className="flex-1 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-medium">{step.phase}</span>
                          <h4 className="font-semibold text-gray-800 text-sm">{step.title}</h4>
                        </div>
                        <ul className="mt-2 space-y-1 ml-1">
                          {step.tasks.map((t, j) => <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5"><span className="text-orange-500">›</span>{t}</li>)}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🏢 Target Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.companies.map(c => <span key={c} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200">{c}</span>)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Avg Salary</p>
                  <p className="text-lg font-bold text-green-700">{selectedPath.avgSalary}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Demand</p>
                  <p className="text-lg font-bold text-orange-700">{selectedPath.demand}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Growth</p>
                  <p className="text-lg font-bold text-purple-700">{selectedPath.growth}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { setActiveTab('learning'); setSelectedPath(null); }} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm">📚 Start Learning Plan</button>
                <button onClick={() => navigate('/jobs')} className="flex-1 py-2.5 border border-orange-300 text-orange-600 hover:bg-orange-50 font-medium rounded-lg text-sm">💼 Find Jobs</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEARNING RESOURCE MODAL */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedResource(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{selectedResource.icon}</div>
                <button onClick={() => setSelectedResource(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{selectedResource.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{selectedResource.platform} • {selectedResource.duration}</p>
              
              <div className="mt-4 space-y-3">
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-orange-700 uppercase mb-1">Skill Focus</p>
                  <p className="text-sm font-bold text-gray-800">{selectedResource.skill}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">What You'll Learn</p>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Core concepts & best practices</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Hands-on project experience</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Industry-relevant skills</li>
                    <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Certificate of completion</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button onClick={() => alert('Course bookmarked! Find it in your saved resources.')} className="flex-1 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm">🔖 Save</button>
                <button onClick={() => { window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedResource.title + ' ' + selectedResource.platform)}`, '_blank'); setSelectedResource(null); }} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm">🚀 Start Learning</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
