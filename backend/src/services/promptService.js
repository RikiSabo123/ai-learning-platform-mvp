const {User, Prompt } = require('../models');
const AIService = require('./AIService');
//create new lesson prompt
exports.createLessonPrompt = async (promptData) => {
    const { userId, categoryId, subCategoryId, promptText } = promptData;
    if (!userId || !categoryId || !subCategoryId || !promptText) {
        throw new Error('All fields are required');
    }
    // Generate AI response
    const aiResponse = await AIService.generateNewLesson(categoryId, subCategoryId, promptText);
    if (!aiResponse) {
        throw new Error('Failed to generate AI response');
    }
    // Save prompt and response to database
    const prompt = await Prompt.create({
        userId,
        categoryId,
        subCategoryId,
        promptText,
        aiResponse
    });
    return prompt;
}
//Get user history
exports.getUserHistory = async (userId) => {
    const user = await User.findByPk(userId, {
        include: [{ model: Prompt, as: 'prompts' }]
    });
    // Check if user exists
    if (!user) {
        throw new Error('User not found');
    }
    return user.prompts;
}
//Get all prompts
exports.getAllPromptsForAdmin = async () => {
    const prompts = await Prompt.findAll();
    if (!prompts) {
        throw new Error('No prompts found');
    }
    return prompts;
}
//Get prompt by id
exports.getPromptById = async (promptId) => {
    if (!promptId) {
        throw new Error('Prompt ID is required');
    }
    const prompt = await Prompt.findByPk(promptId);
    if (!prompt) {
        throw new Error('Prompt not found:( ');
    }
    return prompt;
}

