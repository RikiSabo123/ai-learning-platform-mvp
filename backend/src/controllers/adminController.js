const userService = require('../services/userService');
const promptService = require('../services/promptService');
//Get user history
exports.getUserHistory = async (req, res) => {  
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const history = await userService.getUserHistory(userId);
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user history' });
    }
}
//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsersForAdmin();
        res.status(200).json({ message: 'Users fetched successfully', users });
    }catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}