const userService = require('../services/userService');

//User registration
exports.register = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await userService.register({ ...userData, role: 'user' });
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        next(error);
    }
}
//Get user history
exports.getUserHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await userService.getUserHistory(userId);
        res.status(200).json({ history });
    } catch (error) {
        next(error);
    }
}

//Get all users for admin
exports.getAllUsersForAdmin = async (req, res, next) => {
    try {
        const users = await userService.getAllUsersForAdmin();
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        next(error);
    }
}
// Login function
exports.login = async (req, res, next) => {
    try {
        const { phone } = req.body;

        const result = await userService.login(phone);

        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            maxAge: 24 * 60 * 60 * 1000
        };
        if (isProduction) {
            cookieOptions.sameSite = 'none';
        }

        res.cookie('token', result.token, cookieOptions);

        return res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: {
                id: result.user.id,
                name: result.user.name,
                role: result.user.role
            }
        });

    } catch (error) {
        next(error);
    }
};

// Logout function
exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token'); // Clear the authentication cookie
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};
