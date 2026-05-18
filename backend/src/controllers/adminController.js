const userService = require('../services/userService');
const promptService = require('../services/promptService');

// show all users for admin
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsersForAdmin();
        res.status(200).json({success: true,message: 'Users fetched successfully for admin',users});
    } catch (error) {
    //return the error to the error handling middleware instead of sending a response here, to ensure consistent error handling across the application 
        next(error);
    }
};

// show all prompts for admin
exports.getAllPromptsForAdmin = async (req, res, next) => {
    try {
        const prompts = await promptService.getAllPromptsForAdmin();
        res.status(200).json({success: true,message: 'All system prompts fetched successfully for admin',prompts});
    } catch (error) {
    //return the error to the error handling middleware instead of sending a response here, to ensure consistent error handling across the application 
        next(error); 
    }
};