const UserService = require('../../../../src/domain/services/userService');
const User = require('../../../../src/infra/repositories/models/userModel');
const deleteByIDUserSchema = require('../../../../src/interface/schema/deleteByIDUserSchema');

jest.mock('../../../../src/infra/repositories/models/userModel');
jest.mock('../../../../src/interface/schema/deleteByIDUserSchema');

describe('UserService', () => {
    afterEach(() => {
        jest.resetAllMocks();
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
