const promptService = require('../services/promptService');

// Create a new prompt
exports.createPrompt = async (req, res) => {
    try {
        const promptData = req.body;
        const prompt = await promptService.createLessonPrompt(promptData);
        res.status(201).json({ message: 'Prompt created successfully', prompt });
    } catch (error) {
        res.status(500).json({ message: 'Error creating prompt' });
    }
}
//Get user history
exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await promptService.getUserHistory(userId);
        res.status(200).json({ message: 'User history fetched successfully', history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user history' });
    }   
}
//Get all prompts for admin
exports.getAllPromptsForAdmin = async (req, res) => {
    try {
        const prompts = await promptService.getAllPromptsForAdmin();
        res.status(200).json({ message: 'Prompts fetched successfully', prompts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prompts' });
    }
}
//Get prompt by id
exports.getPromptById = async (req, res) => {
    try {
        const promptId = req.params.id;
        const prompt = await promptService.getPromptById(promptId);
        res.status(200).json({ message: 'Prompt fetched successfully', prompt });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prompt' });
    }
}