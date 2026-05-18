const { User, Prompt, Category, SubCategory } = require('../models');
const AIService = require('./AIService');
//create new lesson prompt
exports.createLessonPrompt = async (promptData) => {
    let { userId, categoryId, subCategoryId, prompt, response } = promptData;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
        throw new Error('All fields are required');
    }

    if (response == null) {
        response = await AIService.generateNewLesson(categoryId, subCategoryId, prompt);
        if (!response) {
            throw new Error('Failed to generate AI response');
        }
    }

    try {
        const newPrompt = await Prompt.create({
            userId,
            categoryId,
            subCategoryId,
            prompt: prompt,
            response
        });
        return {
            id: newPrompt.id,
            prompt: newPrompt.prompt,
            response: newPrompt.response
        };
    } catch (dbError) {
        console.error("Database insertion failed:", dbError);
        throw new Error(`Database error: ${dbError.message}`);
    }
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
    const prompts = await Prompt.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'phone']
            },
            {
                model: Category,
                as: 'category',
                attributes: ['name']
            },
            {
                model: SubCategory,
                as: 'subCategory',
                attributes: ['name']
            }
        ],
        order: [['id', 'DESC']]
    });

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

