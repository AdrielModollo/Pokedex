const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../../infra/repositories/models/userModel');
const registerUserSchema = require('../../interface/schema/registerUserSchema');
const loginAuthSchema = require('../../interface/schema/loginAuthSchema');

dotenv.config();

exports.registerUser = async (userData) => {
    const { name, email, password } = userData;

    const { error } = registerUserSchema.validate({ name, email, password });
    if (error) {
        throw new Error(`Invalid user data: ${error.details[0].message}`);
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });

    return user;
};

exports.authenticateUser = async (userData) => {
    const { email, password } = userData;

    const { error } = loginAuthSchema.validate({ email, password });
    if (error) {
        throw new Error(`Invalid authentication data: ${error.details[0].message}`);
    }

    const user = await User.findOne({ where: { email: email } });
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
