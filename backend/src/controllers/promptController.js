const promptService = require('../services/promptService');
const AIService = require("../services/AIService");
const {Category, SubCategory} = require('../models');
// STREAM LESSON 
exports.streamLesson = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { categoryId, subCategoryId, prompt } = req.body;
        const category = await Category.findByPk(categoryId);
        const subCategory = await SubCategory.findByPk(subCategoryId);

        // validate category/subcategory before calling external AI
        if (!category || !subCategory) {
            return res.status(400).json({ error: "Invalid category or subcategory" });
        }

        const categoryName = category?.name || "לא ידוע";
        const subCategoryName = subCategory?.name || "לא ידוע";

        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");

        let fullResponse = "";

        const stream = await AIService.streamLesson({
            category: categoryName,
            subCategory: subCategoryName,
            prompt
        });
        if (!stream || typeof stream[Symbol.asyncIterator] !== "function") {
            throw new Error("Invalid stream from OpenAI");
        }

        for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            fullResponse += text;
            res.write(text);
        }

        res.end();

        // Ensure correct field names when saving prompt so DB persists history
        await promptService.createLessonPrompt({
            userId,
            categoryId,
            subCategoryId,
            prompt,
            response: fullResponse
        });

    } catch (error) {
        console.error(error);

        if (!res.headersSent) {
            res.status(500).json({ error: "Stream failed" });
        } else {
            res.end();
        }
    }
};
// Create a new prompt
exports.createPrompt = async (req, res, next) => {
    try {
        const promptData = { ...req.body, userId: req.user.id };
        const prompt = await promptService.createLessonPrompt(promptData);
        res.status(201).json(prompt);
    } catch (error) {
        next(error);
    }
}
//Get user history
exports.getUserHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await promptService.getUserHistory(userId);
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
}
//Get all prompts for admin
exports.getAllPromptsForAdmin = async (req, res, next) => {
    try {
        const prompts = await promptService.getAllPromptsForAdmin();
        res.status(200).json({ message: 'Prompts fetched successfully', prompts });
    } catch (error) {
        next(error);
    }
}
//Get prompt by id
exports.getPromptById = async (req, res, next) => {
    try {
        const promptId = req.query.id;
        if (prompt.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "אינך מורשה לצפות בפרומפט זה" });
        }
        const prompt = await promptService.getPromptById(promptId);
        res.status(200).json({ message: 'Prompt fetched successfully', prompt });
    } catch (error) {
        next(error);
    }
}