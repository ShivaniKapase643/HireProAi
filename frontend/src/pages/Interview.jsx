import { useState, useRef, useEffect } from 'react';

const questionBank = {
  dsa: {
    easy: [
      { q: "What is an array? How is it different from a linked list?", topic: "Arrays" },
      { q: "Explain the difference between a stack and a queue.", topic: "Stack/Queue" },
      { q: "What is the time complexity of linear search?", topic: "Searching" },
      { q: "What is a binary tree? What are its types?", topic: "Trees" },
      { q: "Explain bubble sort and its time complexity.", topic: "Sorting" },
    ],
    medium: [
      { q: "How would you detect a cycle in a linked list? Explain with code approach.", topic: "Linked List" },
      { q: "Explain the difference between BFS and DFS. When would you use each?", topic: "Graphs" },
      { q: "What is dynamic programming? Solve the Fibonacci problem using DP.", topic: "DP" },
      { q: "How does a hash map work internally? What are collision handling techniques?", topic: "Hashing" },
      { q: "Explain binary search. What happens if the array is not sorted?", topic: "Searching" },
    ],
    hard: [
      { q: "Design an LRU Cache with O(1) get and put operations. Explain your approach.", topic: "Design" },
      { q: "Find the median of two sorted arrays in O(log n) time. Walk me through the algorithm.", topic: "Binary Search" },
      { q: "Explain Dijkstra's algorithm. How would you handle negative weights?", topic: "Graphs" },
      { q: "Solve the N-Queens problem. What is the time complexity of your solution?", topic: "Backtracking" },
      { q: "Explain the Knapsack problem variants and their optimal solutions.", topic: "DP" },
    ],
  },
  webdev: {
    easy: [
      { q: "What is the difference between HTML, CSS, and JavaScript?", topic: "Basics" },
      { q: "Explain the box model in CSS.", topic: "CSS" },
      { q: "What is the DOM? How do you manipulate it?", topic: "DOM" },
      { q: "What is the difference between let, const, and var?", topic: "JavaScript" },
      { q: "Explain what responsive design means.", topic: "CSS" },
    ],
    medium: [
      { q: "Explain the Virtual DOM in React. How does reconciliation work?", topic: "React" },
      { q: "What is the event loop in Node.js? Explain with an example.", topic: "Node.js" },
      { q: "Compare REST and GraphQL APIs. When would you choose one over the other?", topic: "APIs" },
      { q: "Explain CORS. How do you handle it in a full-stack application?", topic: "Security" },
      { q: "What are React hooks? Explain useEffect cleanup and dependency array.", topic: "React" },
    ],
    hard: [
      { q: "Design a real-time notification system. What technologies and patterns would you use?", topic: "System Design" },
      { q: "Explain how you'd implement authentication with JWT, refresh tokens, and session management.", topic: "Security" },
      { q: "How would you optimize a React application that renders 10,000 items? Explain techniques.", topic: "Performance" },
      { q: "Design a scalable file upload system that handles large files with progress tracking.", topic: "Architecture" },
      { q: "Explain server-side rendering vs client-side rendering. Implement SSR with Next.js approach.", topic: "Rendering" },
    ],
  },
  hr: {
    easy: [
      { q: "Tell me about yourself.", topic: "Introduction" },
      { q: "What are your hobbies and interests?", topic: "Personal" },
      { q: "Why did you choose your current field of study?", topic: "Motivation" },
      { q: "What do you know about our company?", topic: "Company Research" },
      { q: "Where do you see yourself in 5 years?", topic: "Goals" },
    ],
    medium: [
      { q: "Describe a time when you had a conflict with a team member. How did you resolve it?", topic: "Conflict" },
      { q: "What is your greatest strength and weakness? Give examples.", topic: "Self-awareness" },
      { q: "Tell me about a project that failed. What did you learn from it?", topic: "Failure" },
      { q: "How do you handle pressure and tight deadlines? Give a specific example.", topic: "Stress" },
      { q: "Why should we hire you over other candidates?", topic: "Value Proposition" },
    ],
    hard: [
      { q: "If you had to choose between meeting a deadline with lower quality or missing the deadline with perfect quality, what would you do and why?", topic: "Decision Making" },
      { q: "Describe a situation where you had to influence someone without authority. What was the outcome?", topic: "Leadership" },
      { q: "Tell me about a time you received harsh criticism. How did you respond and what changed?", topic: "Feedback" },
      { q: "How would you handle discovering that your manager is making an unethical decision?", topic: "Ethics" },
      { q: "If you had unlimited resources for 1 year, what product would you build and why?", topic: "Vision" },
    ],
  },
  dbms: {
    easy: [
      { q: "What is a database? Explain the difference between SQL and NoSQL.", topic: "Basics" },
      { q: "What is a primary key? Can it be NULL?", topic: "Keys" },
      { q: "What are the different types of SQL JOINs? Give examples.", topic: "Joins" },
      { q: "What is normalization? Why is it important?", topic: "Normalization" },
      { q: "What is a foreign key? How does it maintain referential integrity?", topic: "Keys" },
    ],
    medium: [
      { q: "Explain ACID properties with real-world transaction examples.", topic: "Transactions" },
      { q: "What are indexes? Explain B-Tree vs Hash indexing and when to use each.", topic: "Indexing" },
      { q: "Explain 1NF, 2NF, 3NF and BCNF with examples.", topic: "Normalization" },
      { q: "What is a deadlock? How can you prevent and detect them?", topic: "Concurrency" },
      { q: "Compare MongoDB and PostgreSQL. When would you choose each?", topic: "NoSQL" },
    ],
    hard: [
      { q: "Design a database schema for an e-commerce platform handling millions of transactions.", topic: "Schema Design" },
      { q: "Explain sharding strategies for horizontal scaling. What are the trade-offs?", topic: "Scaling" },
      { q: "How would you implement a distributed transaction across multiple microservices?", topic: "Distributed" },
      { q: "Explain the CAP theorem. How does it apply to MongoDB vs Cassandra?", topic: "Theory" },
      { q: "Optimize a slow query on a table with 100M rows. Walk through your process.", topic: "Optimization" },
    ],
  },
  os: {
    easy: [
      { q: "What is an operating system? List its main functions.", topic: "Basics" },
      { q: "What is the difference between a process and a thread?", topic: "Processes" },
      { q: "Explain the different states of a process.", topic: "Process States" },
      { q: "What is virtual memory? Why is it used?", topic: "Memory" },
      { q: "What is a system call? Give examples.", topic: "System Calls" },
    ],
    medium: [
      { q: "Explain different CPU scheduling algorithms. Compare FCFS, SJF, and Round Robin.", topic: "Scheduling" },
      { q: "What is a deadlock? Explain the four necessary conditions.", topic: "Deadlock" },
      { q: "Explain paging and segmentation in memory management.", topic: "Memory" },
      { q: "What are semaphores and mutexes? How do they differ?", topic: "Synchronization" },
      { q: "Explain the producer-consumer problem and its solution.", topic: "Synchronization" },
    ],
    hard: [
      { q: "Design a memory allocator. Explain first-fit, best-fit, and buddy system approaches.", topic: "Memory" },
      { q: "Explain how Linux handles page faults. Walk through the entire mechanism.", topic: "Virtual Memory" },
      { q: "How does a modern OS implement copy-on-write? What are its applications?", topic: "Advanced" },
      { q: "Explain the Linux kernel's Completely Fair Scheduler (CFS) algorithm.", topic: "Scheduling" },
      { q: "How would you implement a basic file system from scratch?", topic: "File System" },
    ],
  },
};

const evaluateAnswer = (answer, difficulty) => {
  const text = answer.trim().toLowerCase();
  const len = text.length;
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Weak/non-answer detection
  const weakPhrases = ['dont know', "don't know", 'i dont know', 'no idea', 'not sure', 'idk', 'pass', 'skip', 'i don\'t know', 'no answer', 'nothing', 'na', 'n/a', 'cant answer'];
  const isWeak = weakPhrases.some(p => text.includes(p)) || wordCount <= 3;

  if (isWeak) {
    return {
      score: Math.round((1 + Math.random()) * 10) / 10, // 1-2 out of 10
      metrics: { relevance: 1, correctness: 0.5, clarity: 1.5, completeness: 0.5 },
      feedback: '❌ You did not provide a meaningful answer. This would be a red flag in a real interview.\n\n💡 Tip: Even if unsure, explain your thought process. Say what you DO know about the topic, then mention where your knowledge ends.',
    };
  }

  // Short answer (less than 20 words)
  if (wordCount < 20) {
    const base = 3 + Math.random() * 1.5;
    return {
      score: Math.round(base * 10) / 10,
      metrics: { relevance: base, correctness: base - 0.5, clarity: base + 0.5, completeness: 2 },
      feedback: `⚠️ Your answer is too brief (${wordCount} words). In interviews, aim for at least 3-4 sentences.\n\n💡 Tip: Use this structure: Define the concept → Explain how it works → Give an example → Mention edge cases.`,
    };
  }

  // Moderate answer (20-50 words)
  let base = 4.5;
  if (wordCount >= 50) base = 5.5;
  if (wordCount >= 80) base = 6;
  if (wordCount >= 120) base = 6.5;
  if (wordCount >= 180) base = 7;

  // Quality signals
  if (text.includes('example') || text.includes('for instance') || text.includes('e.g')) base += 0.7;
  if (text.includes('because') || text.includes('therefore') || text.includes('reason')) base += 0.4;
  if (text.includes('complexity') || text.includes('o(') || text.includes('time')) base += 0.3;
  if (text.includes('advantage') || text.includes('disadvantage') || text.includes('trade')) base += 0.3;
  if (text.includes('first') || text.includes('second') || text.includes('step')) base += 0.3; // structured
  if (/\d/.test(text)) base += 0.2; // contains numbers/data

  // Difficulty adjustment
  if (difficulty === 'hard') base -= 0.5;
  if (difficulty === 'easy') base += 0.3;

  // Random variance (small)
  base += (Math.random() - 0.5) * 0.8;
  
  let score = Math.min(9.5, Math.max(3, base));
  
  const metrics = {
    relevance: Math.min(10, score + (Math.random() - 0.3) * 0.8),
    correctness: Math.min(10, score + (Math.random() - 0.5) * 1),
    clarity: Math.min(10, wordCount > 40 ? score + 0.3 : score - 0.5),
    completeness: Math.min(10, wordCount > 80 ? score + 0.5 : score - 1),
  };

  let feedback = '';
  if (score >= 8) feedback = '🌟 Excellent! Strong technical depth with good structure and examples.';
  else if (score >= 7) feedback = '👍 Very good! Clear explanation. Adding a real-world example would make it perfect.';
  else if (score >= 6) feedback = '✅ Good answer. Add more depth — explain the "why" behind your statements.';
  else if (score >= 5) feedback = '⚠️ Average. Needs more structure and technical detail. Use specific terminology.';
  else feedback = '📈 Below average. Review this topic. Focus on defining concepts clearly first, then build up.';

  if (wordCount < 50 && score < 8) feedback += '\n\n💡 Tip: Expand your answer with examples and edge cases.';
  if (!text.includes('example') && score < 8) feedback += '\n💡 Tip: Always include at least one concrete example.';

  return { score: Math.round(score * 10) / 10, metrics, feedback };
};

export default function Interview() {
  const [phase, setPhase] = useState('setup'); // setup, interview, report
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [config, setConfig] = useState({ domain: 'dsa', difficulty: 'medium', company: '', totalQ: 5 });
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const getQuestions = () => {
    const domain = questionBank[config.domain] || questionBank.dsa;
    const diff = domain[config.difficulty] || domain.medium;
    return diff.slice(0, config.totalQ);
  };

  const startInterview = () => {
    const qs = getQuestions();
    setPhase('interview');
    setCurrentQ(0);
    setScores([]);
    setTimer(0);
    setIsTimerRunning(true);
    setMessages([
      { role: 'system', text: `🎯 ${config.domain.toUpperCase()} Interview • ${config.difficulty.toUpperCase()} • ${config.totalQ} Questions${config.company ? ` • ${config.company} Style` : ''}` },
      { role: 'ai', text: `Hello! I'm your AI interviewer. Let's begin.\n\n**Question 1/${config.totalQ}** [${qs[0].topic}]\n\n${qs[0].q}` },
    ]);
  };

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const answer = input;
    setMessages(prev => [...prev, { role: 'user', text: answer }]);
    setInput('');

    setTimeout(() => {
      const evaluation = evaluateAnswer(answer, config.difficulty);
      const newScores = [...scores, evaluation.score];
      setScores(newScores);

      let aiText = `**Score: ${evaluation.score}/10**\n\n`;
      aiText += `📊 Relevance: ${evaluation.metrics.relevance.toFixed(1)} | Correctness: ${evaluation.metrics.correctness.toFixed(1)} | Clarity: ${evaluation.metrics.clarity.toFixed(1)} | Completeness: ${evaluation.metrics.completeness.toFixed(1)}\n\n`;
      aiText += evaluation.feedback;

      const nextQ = currentQ + 1;
      const qs = getQuestions();

      if (nextQ < qs.length) {
        aiText += `\n\n---\n\n**Question ${nextQ + 1}/${config.totalQ}** [${qs[nextQ].topic}]\n\n${qs[nextQ].q}`;
        setCurrentQ(nextQ);
      } else {
        aiText += `\n\n---\n\n✅ **Interview Complete!** Click "View Report" to see your detailed analysis.`;
        setIsTimerRunning(false);
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setLoading(false);
    }, 1200);
  };

  const generateReport = () => {
    setPhase('report');
  };

  const getOverallGrade = (avg) => {
    if (avg >= 9) return { grade: 'A+', color: 'text-green-600', label: 'Outstanding' };
    if (avg >= 8) return { grade: 'A', color: 'text-green-600', label: 'Excellent' };
    if (avg >= 7) return { grade: 'B+', color: 'text-blue-600', label: 'Good' };
    if (avg >= 6) return { grade: 'B', color: 'text-blue-600', label: 'Above Average' };
    if (avg >= 5) return { grade: 'C', color: 'text-orange-600', label: 'Average' };
    return { grade: 'D', color: 'text-red-600', label: 'Needs Improvement' };
  };

  // SETUP PHASE
  if (phase === 'setup') {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">🤖</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AI Mock Interview</h1>
            <p className="text-gray-500 text-sm">Practice with adaptive AI and get detailed performance analysis</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Domain</label>
              <select value={config.domain} onChange={e => setConfig({...config, domain: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="dsa">Data Structures & Algorithms</option>
                <option value="webdev">Web Development (MERN)</option>
                <option value="dbms">Database Management</option>
                <option value="os">Operating Systems</option>
                <option value="hr">HR / Behavioral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
              <select value={config.difficulty} onChange={e => setConfig({...config, difficulty: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="easy">Easy (Fresher)</option>
                <option value="medium">Medium (1-2 YOE)</option>
                <option value="hard">Hard (Senior)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company (Optional)</label>
              <select value={config.company} onChange={e => setConfig({...config, company: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">General</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Microsoft">Microsoft</option>
                <option value="TCS">TCS</option>
                <option value="Infosys">Infosys</option>
                <option value="Wipro">Wipro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Questions</label>
              <select value={config.totalQ} onChange={e => setConfig({...config, totalQ: parseInt(e.target.value)})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="3">3 (Quick)</option>
                <option value="5">5 (Standard)</option>
                <option value="7">7 (Extended)</option>
              </select>
            </div>
          </div>

          <button onClick={startInterview} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition text-lg">
            🎤 Start Interview
          </button>
        </div>

        {/* Tips */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <h3 className="font-medium text-orange-800 mb-2">💡 Interview Tips</h3>
            <ul className="text-sm text-orange-700 space-y-1.5">
              <li>• Structure answers: intro → explanation → example</li>
              <li>• Use STAR method for behavioral questions</li>
              <li>• Mention time/space complexity for DSA</li>
              <li>• Be specific — avoid generic answers</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-medium text-blue-800 mb-2">📊 Scoring Criteria</h3>
            <ul className="text-sm text-blue-700 space-y-1.5">
              <li>• <strong>Relevance</strong> — Does it answer the question?</li>
              <li>• <strong>Correctness</strong> — Is it technically accurate?</li>
              <li>• <strong>Clarity</strong> — Is it well-structured?</li>
              <li>• <strong>Completeness</strong> — Is it thorough enough?</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // REPORT PHASE
  if (phase === 'report') {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const gradeInfo = getOverallGrade(avg);
    const qs = getQuestions();

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Interview Report</h1>
          <button onClick={() => setPhase('setup')} className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600">New Interview</button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall Performance</p>
              <p className={`text-5xl font-bold ${gradeInfo.color} mt-1`}>{gradeInfo.grade}</p>
              <p className="text-sm text-gray-500 mt-1">{gradeInfo.label} • {avg.toFixed(1)}/10 avg</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-gray-500">⏱ Duration: {formatTime(timer)}</p>
              <p className="text-sm text-gray-500">📝 Questions: {scores.length}/{config.totalQ}</p>
              <p className="text-sm text-gray-500">🎯 Domain: {config.domain.toUpperCase()}</p>
              <p className="text-sm text-gray-500">📈 Difficulty: {config.difficulty}</p>
            </div>
          </div>
        </div>

        {/* Question-wise scores */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-medium text-gray-800 mb-4">Question-wise Analysis</h3>
          <div className="space-y-3">
            {scores.map((score, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-6">Q{i+1}</span>
                <span className="text-xs text-gray-400 w-24">[{qs[i]?.topic}]</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${score >= 7 ? 'bg-green-500' : score >= 5 ? 'bg-orange-400' : 'bg-red-400'}`} style={{width: `${score*10}%`}}></div>
                </div>
                <span className="text-sm font-bold w-12">{score}/10</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-medium text-green-800 mb-2">✅ Strengths</h4>
            <ul className="text-sm text-green-700 space-y-1">
              {avg >= 6 && <li>• Consistent performance across questions</li>}
              {scores.some(s => s >= 8) && <li>• Excellent answers on key topics</li>}
              <li>• Completed all questions within time</li>
              {timer < config.totalQ * 120 && <li>• Quick response time</li>}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-medium text-red-800 mb-2">📈 Improve</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {avg < 7 && <li>• Add more specific examples</li>}
              {scores.some(s => s < 5) && <li>• Review weak topics thoroughly</li>}
              <li>• Practice time management</li>
              <li>• Use structured answer format</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // INTERVIEW PHASE
  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 bg-white rounded-lg border px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">🤖 AI Interviewer</span>
          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">{config.domain.toUpperCase()}</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{config.difficulty}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-mono">⏱ {formatTime(timer)}</span>
          <span className="text-sm text-gray-500">Q {Math.min(currentQ + 1, config.totalQ)}/{config.totalQ}</span>
          {currentQ >= config.totalQ - 1 && scores.length >= config.totalQ && (
            <button onClick={generateReport} className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600">View Report</button>
          )}
          <button onClick={() => { setPhase('setup'); setIsTimerRunning(false); }} className="text-xs text-red-500 hover:text-red-600 font-medium">End</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border p-4 space-y-3 mb-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap ${
              msg.role === 'user' ? 'bg-orange-500 text-white' :
              msg.role === 'system' ? 'bg-gray-800 text-white text-xs text-center w-full' :
              'bg-gray-100 text-gray-800'
            }`}>
              {msg.text.split('**').map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-gray-100 px-4 py-3 rounded-xl text-sm text-gray-500 animate-pulse">🤖 Evaluating your answer...</div></div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}} placeholder="Type your answer... (Shift+Enter for new line)" className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none" rows={2} />
        <button onClick={sendMessage} disabled={loading || !input.trim()} className="px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50 transition">
          Send
        </button>
      </div>
    </div>
  );
}
