const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../src/infra/repositories/models/userModel');
const registerUserSchema = require('../../../src/interface/schema/registerUserSchema');
const loginAuthSchema = require('../../../src/interface/schema/loginAuthSchema');
const authService = require('../../../src/domain/services/authService');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../../src/infra/repositories/models/userModel');
jest.mock('../../../src/interface/schema/registerUserSchema');
jest.mock('../../../src/interface/schema/loginAuthSchema');

describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        const mockUserData = { name: 'John Doe', email: 'john.doe@example.com', password: '123' };
        const mockHashedPassword = 'hashedPassword';
        const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com', password: mockHashedPassword };

        it('should create a new user', async () => {
            registerUserSchema.validate.mockReturnValue({ error: undefined });
            User.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue(mockHashedPassword);
            User.create.mockResolvedValue(mockUser);

            const result = await authService.registerUser(mockUserData);

            expect(result).toEqual(mockUser);
            expect(registerUserSchema.validate).toHaveBeenCalledWith(mockUserData);
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockUserData.email } });
            expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 12);
            expect(User.create).toHaveBeenCalledWith({ name: mockUserData.name, email: mockUserData.email, password: mockHashedPassword });
        });

        it('should throw an error if user data is invalid', async () => {
            const mockUserData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123'
            };
            const mockError = new Error('Invalid user data');
            registerUserSchema.validate.mockReturnValue({ error: mockError });

            await expect(authService.registerUser(mockUserData)).rejects.toThrow(mockError);
            expect(registerUserSchema.validate).toHaveBeenCalledWith(mockUserData);
        });


        it('should throw an error if email is already registered', async () => {

            User.findOne.mockResolvedValue(mockUser);

            await expect(authService.registerUser(mockUserData)).rejects.toThrow('Email already registered');
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockUserData.email } });
            expect(bcrypt.hash).not.toHaveBeenCalled();
            expect(User.create).not.toHaveBeenCalled();
        });
    });

    describe('authenticateUser', () => {
        const mockUserData = { email: 'john.doe@example.com', password: 'password' };
        const mockToken = 'mockToken';
        const mockUser = { id: '1', email: 'john.doe@example.com', password: 'hashedPassword' };
        const mockMatch = true;

        it('should authenticate the user and return a token', async () => {
            loginAuthSchema.validate.mockReturnValue({ error: undefined });
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(mockMatch);
            jwt.sign.mockReturnValue(mockToken);

            const result = await authService.authenticateUser(mockUserData);

            expect(result).toEqual(mockToken);
            expect(loginAuthSchema.validate).toHaveBeenCalledWith(mockUserData);
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockUserData.email } });
            expect(bcrypt.compare).toHaveBeenCalledWith(mockUserData.password, mockUser.password);
            expect(mockToken).toBeDefined();
            expect(result).toBe(mockToken);
        });

        it('should throw an error if user not found', async () => {
            const mockUserData = {
                email: 'test@test.com',
                password: 'password123',
            };

            User.findOne.mockResolvedValue(null);

            await expect(authService.authenticateUser(mockUserData)).rejects.toThrow('User not found');
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockUserData.email } });
        });


        it('should throw an error if authentication failed', async () => {
            const mockUserData = {
                email: 'test@test.com',
                password: 'password123',
            };
            const mockUser = {
                email: 'test@test.com',
                password: 'wrongPassword',
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            await expect(authService.authenticateUser(mockUserData)).rejects.toThrow('Authentication failed');
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockUserData.email } });
            expect(bcrypt.compare).toHaveBeenCalledWith(mockUserData.password, mockUser.password);
        });

        it('should throw an error if user data is invalid', async () => {
            const mockUserData = {
                email: 'john.doe@example.com',
                password: '123'
            };
            const mockError = new Error('Invalid user data');
            loginAuthSchema.validate.mockReturnValue({ error: mockError });

            await expect(authService.authenticateUser(mockUserData)).rejects.toThrow(mockError);
            expect(loginAuthSchema.validate).toHaveBeenCalledWith(mockUserData);
        });
    });
});






