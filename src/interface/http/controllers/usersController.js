const UserService = require('../../../domain/services/userService');

const userService = new UserService();

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({ users: users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const result = await userService.updateUser(req.params.userId, req.body);
        res.status(200).json({ message: 'User updated!', user: result });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}
