const userService = require('../services/userService');
//User registration
exports.register = async (req, res) => {
    try{
        const userData = req.body;
        const user = await userService.register(userData);
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch(error){
        res.status(500).json({ message: 'Error registering user' });
    }
}
//Get user history
exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.params.id;
        const history = await userService.getUserHistory(userId);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user history' });
    }
}