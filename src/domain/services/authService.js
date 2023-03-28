const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../../infra/repositories/models/userModel');
const registerUserSchema = require('../../interface/schema/registerUserSchema');
const loginAuthSchema = require('../../interface/schema/loginAuthSchema');

dotenv.config();

exports.registerUser = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const validationResult = registerUserSchema.validate({ name, email, password });
    if (validationResult.error) {
        throw validationResult.error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });

    return user;
};



exports.authenticateUser = async (userData) => {
    const { email, password } = userData;

    const validationResult = loginAuthSchema.validate({ email, password });
    if (validationResult.error) {
        throw validationResult.error;
    }

    const user = await User.findOne({ where: { email } }); // simplificação aqui
    if (!user) {
        throw new Error('User not found');
    }

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
        throw new Error('Authentication failed');
    }

    const token = jwt.sign(
        { email: user.email, userId: user.id.toString() },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
    );

    return token;
};
