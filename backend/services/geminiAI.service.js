const { getGeminiModel } = require('../config/gemini');
const logger = require('../config/logger');

class GeminiAIService {
  constructor() {
    this.model = getGeminiModel();
  }

  // Generate interview questions (FR-2.2)
  async generateInterviewQuestions(domain, difficulty, company, resumeData, count = 5) {
    const prompt = `Generate ${count} ${difficulty} level ${domain} interview questions${company ? ` for ${company}` : ''}.
    ${resumeData ? `Based on candidate profile: ${JSON.stringify(resumeData)}` : ''}
    Return as JSON array: [{"question": "", "expectedAnswer": "", "topic": "", "difficulty": ""}]`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // Evaluate interview answer (FR-2.6)
  async evaluateAnswer(question, answer, domain) {
    const prompt = `Evaluate this ${domain} interview answer.
    Question: ${question}
    Answer: ${answer}
    Rate 0-10 on: relevance, correctness, clarity, completeness.
    Provide brief feedback. Return JSON: {"score": 0, "metrics": {"relevance": 0, "correctness": 0, "clarity": 0, "completeness": 0}, "feedback": ""}`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // Analyze resume (FR-3.2, FR-3.3)
  async analyzeResume(resumeText, targetRole) {
    const prompt = `Analyze this resume for ATS compatibility${targetRole ? ` for ${targetRole} role` : ''}.
    Resume: ${resumeText}
    Provide: parsed sections, ATS score (0-100), keyword analysis, formatting issues, grammar issues, improvement suggestions.
    Return comprehensive JSON with: {parsedData, atsScore, keywords: {matched, missing, recommended}, formatting: {score, issues}, grammar: {score, errors}, suggestions: [{section, priority, suggestion}]}`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // Match resume with job description (FR-3.12)
  async matchJobDescription(resumeText, jobDescription) {
    const prompt = `Compare this resume against the job description.
    Resume: ${resumeText}
    Job Description: ${jobDescription}
    Calculate match score and identify gaps. Return JSON: {matchScore, matchedSkills: [], missingSkills: [], recommendations: []}`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // Generate career recommendations (FR-5)
  async generateCareerRecommendations(userProfile) {
    const prompt = `Based on this student profile, provide career recommendations:
    ${JSON.stringify(userProfile)}
    Include: suitable roles, career paths, skill gaps, learning resources.
    Return JSON: {recommendedRoles: [], careerPaths: [], skillGaps: [], learningResources: []}`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // Generate interview feedback (FR-2.8)
  async generateInterviewFeedback(interviewData) {
    const prompt = `Generate comprehensive interview feedback:
    Domain: ${interviewData.domain}, Questions answered: ${interviewData.questionsAnswered}
    Performance data: ${JSON.stringify(interviewData.scores)}
    Return JSON: {strengths: [], weaknesses: [], improvements: [], overallRemarks: "", preparationPlan: []}`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // Job recommendations (FR-4.9)
  async getJobRecommendations(userSkills, preferences) {
    const prompt = `Recommend job roles for a candidate with:
    Skills: ${JSON.stringify(userSkills)}
    Preferences: ${JSON.stringify(preferences)}
    Return JSON: {recommendedJobs: [{title, matchScore, requiredSkills, growthPotential}], careerPath: []}`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
}

module.exports = new GeminiAIService();
