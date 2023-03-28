const UserService = require('../../../../../src/domain/services/userService');
const userController = require('../../../../../src/interface/http/controllers/usersController');

jest.mock('../../../../../src/domain/services/userService');

describe('User Controller', () => {
    describe('getUsers', () => {
        it('should get all users', async () => {
            const mockUsers = [{ name: 'John' }, { name: 'Jane' }];
            UserService.prototype.getUsers.mockResolvedValue(mockUsers);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.getUsers(req, res, next);

            expect(UserService.prototype.getUsers).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ users: mockUsers });
        });

        it('should return error message when failing to get users', async () => {
            const mockError = new Error('Failed to get users');
            UserService.prototype.getUsers.mockRejectedValue(mockError);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.getUsers(req, res, next);

            expect(UserService.prototype.getUsers).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('getUser', () => {
        it('should get user by id', async () => {
            const mockUser = { name: 'John' };
            UserService.prototype.getUserById.mockResolvedValue(mockUser);

            const req = { params: { userId: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.getUser(req, res, next);

            expect(UserService.prototype.getUserById).toHaveBeenCalledTimes(1);
            expect(UserService.prototype.getUserById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ user: mockUser });
        });

        it('should return error message when failing to get user by id', async () => {
            const mockError = new Error('Failed to get user by id');
            UserService.prototype.getUserById.mockRejectedValue(mockError);

            const req = { params: { userId: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.getUser(req, res, next);

            expect(UserService.prototype.getUserById).toHaveBeenCalledTimes(2);
            expect(UserService.prototype.getUserById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Failed to get user by id' });
        });
    });

    describe('updateUser', () => {
        it('should update user by id', async () => {
            const mockResult = { name: 'John', age: 30 };
            UserService.prototype.updateUser.mockResolvedValue(mockResult);

            const req = { params: { userId: '123' }, body: { name: 'John', age: 30 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.updateUser(req, res, next);

            expect(UserService.prototype.updateUser).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User updated!', user: mockResult });
        });

        it('should return error message when failing to update user', async () => {
            const mockError = new Error('Failed to update user');
            UserService.prototype.updateUser.mockRejectedValue(mockError);

            const req = { params: { userId: '123' }, body: { name: 'John' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.updateUser(req, res, next);

            expect(UserService.prototype.updateUser).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });

    });

    describe('deleteUser', () => {
        it('should delete user', async () => {
            const mockResult = { n: 1, ok: 1 };
            UserService.prototype.deleteUser.mockResolvedValue(mockResult);
            const req = { params: { userId: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.deleteUser(req, res, next);

            expect(UserService.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return error message when failing to delete user', async () => {
            const mockError = new Error('Failed to delete user');
            UserService.prototype.deleteUser.mockRejectedValue(mockError);

            const req = { params: { userId: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await userController.deleteUser(req, res, next);

            expect(UserService.prototype.deleteUser).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
    });
});  
