const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiModel = (modelName = 'gemini-pro') => {
  return genAI.getGenerativeModel({ model: modelName });
};

module.exports = { genAI, getGeminiModel };
