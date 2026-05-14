const {User,Prompt } = require('../models');
//User registration
exports.register = async (userData) => {
    const { name, phone } = userData;
    if (!name || !phone) {
        throw new Error('Name and phone are required');
    }
    // Check if user is exists
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
        throw new Error('User with this phone number already exists');
    }
    const user = await User.create({ name, phone });
    return user;
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
//get all users for admin
exports.getAllUsersForAdmin = async () => {
    const users = await User.findAll({
        include: [{ model: Prompt, as: 'prompts' }]
    });
    if (!users || users.length === 0) {
        throw new Error('No users found');
    }
    return users;
}