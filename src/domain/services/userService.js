const User = require('../../infra/repositories/models/userModel');
const updateUserSchema = require('../../interface/schema/updateUserSchema');
const getByIDUserSchema = require('../../interface/schema/getByIDUserSchema');
const deleteByIDUserSchema = require('../../interface/schema/deleteByIDUserSchema');

class UserService {
    async getUsers() {
        return User.findAll();
    }

    async getUserById(userId) {
        const { error: validationError } = getByIDUserSchema.validate({ params: { userId } });
        if (validationError) {
            throw new Error(validationError.details[0].message);
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found!');
        }

        return user;
    }

    async updateUser(userId, updatedData) {
        const { name: updatedName, email: updatedEmail, password: updatedPassword } = updatedData;

        const { error: validationError } = updateUserSchema.validate({ params: { userId }, body: { name: updatedName, email: updatedEmail, password: updatedPassword } });
        if (validationError) {
            throw new Error(validationError.details[0].message);
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found!');
        }

        user.name = updatedName;
        user.email = updatedEmail;
        user.password = updatedPassword;

        return user.save();
    }

    async deleteUser(userId) {
        const { error: validationError } = deleteByIDUserSchema.validate({ params: { userId } });
        if (validationError) {
            throw new Error(validationError.details[0].message);
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found!');
        }

        await User.destroy({ where: { id: userId } });

        return { message: 'User deleted!' };
    }
}

module.exports = UserService;
