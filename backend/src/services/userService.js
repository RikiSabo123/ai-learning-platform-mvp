const { User, Prompt } = require('../models');
const jwt = require('jsonwebtoken');

const ADMIN_PHONE = process.env.ADMIN_PHONE || 'admin';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';
const ADMIN_ROLE = process.env.ADMIN_ROLE || 'admin';

exports.generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );
};
exports.login = async (phone) => {
    let user = await User.findOne({ where: { phone } });

    if (!user) {
        if (phone === ADMIN_PHONE) {
            user = await User.create({ name: ADMIN_NAME, phone: ADMIN_PHONE, role: ADMIN_ROLE });
        } else {
            throw new Error('User not found');
        }
    }

    if (phone === ADMIN_PHONE && user.role !== ADMIN_ROLE) {
        user.role = ADMIN_ROLE;
        await user.save();
    }

    const token = exports.generateToken(user);

    return { user, token };
};


//User registration
exports.register = async (userData) => {
    const { name, phone, role } = userData;
    if (!name || !phone) {
        throw new Error('Name and phone are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
        throw new Error('User with this phone number already exists');
    }
    const user = await User.create({ name, phone, role: role || 'user' });
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