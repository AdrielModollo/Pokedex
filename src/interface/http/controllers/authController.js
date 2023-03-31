const userService = require('../../../domain/services/authService');

exports.register = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            message: 'User created successfully!',
            user: user,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const token = await userService.authenticateUser(req.body);
        res.status(200).json({
            message: 'Authentication successful',
            token: token,
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
