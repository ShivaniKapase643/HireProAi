const Interview = require('../models/Interview');
const geminiAI = require('../services/geminiAI.service');
const logger = require('../config/logger');

// @desc Start new interview (FR-2.1)
const startInterview = async (req, res, next) => {
  try {
    const { domain, company, difficulty, interviewType, mode, resumeId } = req.body;

    const interview = await Interview.create({
      user: req.user._id,
      domain, company, difficulty, interviewType, mode,
      resumeUsed: resumeId || null,
    });

    // Generate initial questions
    const questions = await geminiAI.generateInterviewQuestions(domain, difficulty, company, null, 1);
    interview.questions.push({ question: questions[0].question, expectedAnswer: questions[0].expectedAnswer, topic: questions[0].topic, difficulty });
    interview.totalQuestions = 10;
    await interview.save();

    res.status(201).json({ success: true, data: { interviewId: interview._id, question: questions[0].question, totalQuestions: 10 } });
  } catch (error) {
    next(error);
  }
};

// @desc Send message/answer in interview (FR-2.4, FR-2.6)
const sendMessage = async (req, res, next) => {
  try {
    const { answer } = req.body;
    const interview = await Interview.findById(req.params.id);

    if (!interview || interview.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Evaluate answer
    const lastQuestion = interview.questions[interview.questions.length - 1];
    const evaluation = await geminiAI.evaluateAnswer(lastQuestion.question, answer, interview.domain);

    // Update last question with answer and score
    lastQuestion.userAnswer = answer;
    lastQuestion.score = evaluation.score;
    lastQuestion.feedback = evaluation.feedback;
    lastQuestion.evaluationMetrics = evaluation.metrics;
    interview.questionsAnswered += 1;

    // Adaptive difficulty (FR-2.3)
    if (evaluation.score >= 7) {
      interview.adaptiveState.consecutiveCorrect += 1;
      interview.adaptiveState.consecutiveWrong = 0;
      if (interview.adaptiveState.consecutiveCorrect >= 2) {
        interview.adaptiveState.currentDifficulty = Math.min(10, interview.adaptiveState.currentDifficulty + 1);
      }
    } else if (evaluation.score <= 4) {
      interview.adaptiveState.consecutiveWrong += 1;
      interview.adaptiveState.consecutiveCorrect = 0;
      if (interview.adaptiveState.consecutiveWrong >= 2) {
        interview.adaptiveState.currentDifficulty = Math.max(1, interview.adaptiveState.currentDifficulty - 1);
      }
    }

    // Generate next question if not finished
    let nextQuestion = null;
    if (interview.questionsAnswered < interview.totalQuestions) {
      const adaptedDifficulty = interview.adaptiveState.currentDifficulty <= 3 ? 'easy' : interview.adaptiveState.currentDifficulty <= 7 ? 'medium' : 'hard';
      const questions = await geminiAI.generateInterviewQuestions(interview.domain, adaptedDifficulty, interview.company, null, 1);
      interview.questions.push({ question: questions[0].question, expectedAnswer: questions[0].expectedAnswer, topic: questions[0].topic, difficulty: adaptedDifficulty });
      nextQuestion = questions[0].question;
    }

    await interview.save();

    res.status(200).json({
      success: true,
      data: {
        evaluation, nextQuestion,
        progress: `${interview.questionsAnswered}/${interview.totalQuestions}`,
        isComplete: interview.questionsAnswered >= interview.totalQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc End interview (FR-2.7, FR-2.8)
const endInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: 'Not found' });

    // Calculate scores
    const scores = interview.questions.reduce((acc, q) => {
      if (q.score !== undefined) {
        acc.total += q.score;
        acc.count += 1;
      }
      return acc;
    }, { total: 0, count: 0 });

    interview.scores.overall = scores.count > 0 ? Math.round((scores.total / scores.count) * 10) : 0;
    interview.status = 'completed';
    interview.duration = Math.round((Date.now() - interview.createdAt) / 1000);

    // Generate AI feedback
    const feedback = await geminiAI.generateInterviewFeedback(interview);
    interview.feedback = feedback;

    await interview.save();
    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

// @desc Get interview history
const getInterviewHistory = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ user: req.user._id }).sort({ createdAt: -1 }).select('-questions.expectedAnswer');
    res.status(200).json({ success: true, count: interviews.length, data: interviews });
  } catch (error) {
    next(error);
  }
};

const getInterviewById = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

const generateReport = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: 'Not found' });
    // Report generation logic would go here (PDF generation)
    res.status(200).json({ success: true, data: { reportUrl: interview.reportUrl, interview } });
  } catch (error) {
    next(error);
  }
};

const getCompanyQuestions = async (req, res, next) => {
  try {
    const questions = await geminiAI.generateInterviewQuestions('technical', 'medium', req.params.company, null, 10);
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    next(error);
  }
};

const evaluateVoiceResponse = async (req, res, next) => {
  try {
    const { transcription, audioMetrics } = req.body;
    // Voice evaluation logic (FR-8)
    res.status(200).json({ success: true, data: { transcription, metrics: audioMetrics } });
  } catch (error) {
    next(error);
  }
};

const getPreparationTracker = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ user: req.user._id, status: 'completed' }).sort({ createdAt: -1 }).limit(20);
    const tracker = {
      totalInterviews: interviews.length,
      averageScore: interviews.reduce((a, i) => a + (i.scores.overall || 0), 0) / (interviews.length || 1),
      domainProgress: {},
      streak: 0,
    };
    res.status(200).json({ success: true, data: tracker });
  } catch (error) {
    next(error);
  }
};

const getInterviewAnalytics = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ user: req.user._id, status: 'completed' });
    res.status(200).json({ success: true, data: { total: interviews.length, interviews } });
  } catch (error) {
    next(error);
  }
};

const deleteInterview = async (req, res, next) => {
  try {
    await Interview.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startInterview, sendMessage, endInterview, getInterviewHistory,
  getInterviewById, generateReport, getCompanyQuestions, evaluateVoiceResponse,
  getPreparationTracker, getInterviewAnalytics, deleteInterview,
};
