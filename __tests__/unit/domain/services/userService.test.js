const UserService = require('../../../../src/domain/services/userService');
const User = require('../../../../src/infra/repositories/models/userModel');
const deleteByIDUserSchema = require('../../../../src/interface/schema/deleteByIDUserSchema');
const updateUserSchema = require('../../../../src/interface/schema/updateUserSchema');

jest.mock('../../../../src/infra/repositories/models/userModel');
jest.mock('../../../../src/interface/schema/deleteByIDUserSchema');
jest.mock('../../../../src/interface/schema/updateUserSchema');

describe('UserService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getUsers', () => {
        it('should return all users', async () => {
            const mockUsers = [{ id: 1, name: 'John Doe', email: 'johndoe@example.com', password: 'password123' }, { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', password: 'password123' },];
            User.findAll.mockResolvedValue(mockUsers);

            const userService = new UserService();
            const users = await userService.getUsers();

            expect(User.findAll).toHaveBeenCalledTimes(1);
            expect(users).toEqual(mockUsers);
        });

        it('should return an empty array if no users are found', async () => {
            User.findAll.mockResolvedValue([]);

            const userService = new UserService();
            const users = await userService.getUsers();

            expect(User.findAll).toHaveBeenCalledTimes(1);
            expect(users).toEqual([]);
        });
    });

    describe('updateUser', () => {
        const userId = 1;
        const mockUser = {
            id: userId,
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should throw an error if validation fails', async () => {
            const mockError = new Error('Invalid input');
            const mockReturnValue = { error: mockError }; // objeto que contém a propriedade error com o valor do objeto de erro
            jest.spyOn(updateUserSchema, 'validate').mockReturnValueOnce(mockReturnValue);

            const userService = new UserService();

            await expect(userService.updateUser(userId, {})).rejects.toThrow('Invalid input');

            expect(updateUserSchema.validate).toHaveBeenCalledTimes(1);
            expect(updateUserSchema.validate).toHaveBeenCalledWith({ params: { userId }, body: {} });
        });

        it('should throw an error if user is not found', async () => {
            jest.spyOn(updateUserSchema, 'validate').mockReturnValueOnce({ value: { params: { userId } }, error: undefined });
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce(null);

            const userService = new UserService();

            await expect(userService.updateUser(userId, {})).rejects.toThrow('User not found!');

            expect(User.findByPk).toHaveBeenCalledTimes(1);
            expect(User.findByPk).toHaveBeenCalledWith(userId);
        });

        it('should update a user', async () => {
            const userId = '1';
            const updatedData = {
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                password: 'new_password',
            };

            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'old_password',
                save: jest.fn().mockImplementation(() => mockUser),
            };

            User.findByPk.mockResolvedValue(mockUser);
            updateUserSchema.validate.mockReturnValue({ error: null });

            const userService = new UserService();
            const result = await userService.updateUser(userId, updatedData);

            expect(User.findByPk).toHaveBeenCalledWith(userId);
            expect(updateUserSchema.validate).toHaveBeenCalledWith({
                params: { userId },
                body: updatedData,
            });
            expect(mockUser.save).toHaveBeenCalled();
            expect(result).toEqual({
                id: 1,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                password: 'new_password',
                save: expect.any(Function),
            });
        });

    });


    describe('getUserById', () => {
        it('should return a user by id', async () => {
            const userId = '1';
            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456'
            };
            const validateMock = jest.fn().mockReturnValue({ error: undefined });
            User.findByPk.mockResolvedValue(mockUser);

            const userService = new UserService();
            const user = await userService.getUserById(userId);

            expect(User.findByPk).toHaveBeenCalledWith(userId);
            expect(user).toEqual(mockUser);
        });

        it('should throw an error if user not found', async () => {
            const userId = '1';
            const mockError = new Error('User not found!');
            User.findByPk.mockResolvedValue(null);

            const userService = new UserService();

            await expect(userService.getUserById(userId)).rejects.toThrowError(mockError);
            expect(User.findByPk).toHaveBeenCalledWith(userId);
        });
    });

    describe('deleteUser', () => {
        const userId = 1;
        const mockUser = {
            id: userId,
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should throw an error if validation fails', async () => {
            const userId = 'abc';
            const mockError = new Error('Invalid user id');
            const mockReturnValue = { error: mockError }; // objeto que contém a propriedade error com o valor do objeto de erro
            jest.spyOn(deleteByIDUserSchema, 'validate').mockReturnValueOnce(mockReturnValue);

            const userService = new UserService();

            await expect(userService.deleteUser(userId)).rejects.toThrow('Invalid input'); // mensagem de erro esperada atualizada

            expect(deleteByIDUserSchema.validate).toHaveBeenCalledTimes(1);
            expect(deleteByIDUserSchema.validate).toHaveBeenCalledWith({ params: { userId } });
        });


        it('should throw an error if user is not found', async () => {
            const userId = 1;
            jest.spyOn(deleteByIDUserSchema, 'validate').mockReturnValueOnce({ value: { params: { userId } } });
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce(null);

            const userService = new UserService();

            await expect(userService.deleteUser(userId)).rejects.toThrow('User not found!');

            expect(User.findByPk).toHaveBeenCalledTimes(1);
            expect(User.findByPk).toHaveBeenCalledWith(userId);
        });

        it('should delete a user', async () => {
            const userId = 1;
            jest.spyOn(deleteByIDUserSchema, 'validate').mockReturnValueOnce({ value: { params: { userId } } });
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce(mockUser);
            jest.spyOn(User, 'destroy').mockResolvedValueOnce(1);

            const userService = new UserService();
            const result = await userService.deleteUser(userId);

            expect(result).toEqual({ message: 'User deleted!' });
            expect(User.findByPk).toHaveBeenCalledTimes(1);
            expect(User.findByPk).toHaveBeenCalledWith(userId);
            expect(User.destroy).toHaveBeenCalledTimes(1);
            expect(User.destroy).toHaveBeenCalledWith({ where: { id: userId } });
        });
    });

});
