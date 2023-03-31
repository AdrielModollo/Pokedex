const authService = require('../../../../../src/domain/services/authService');
const authController = require('../../../../../src/interface/http/controllers/authController');

jest.mock('../../../../../src/domain/services/authService');

describe('AuthController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    describe('register', () => {
        it('should register a new user and return status 201', async () => {
            const mockUser = { id: 1, name: 'John', email: 'john@gmail.com' };
            authService.registerUser.mockResolvedValue(mockUser);

            req.body = { name: 'John', email: 'john@gmail.com', password: '123456' };

            await authController.register(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User created successfully!',
                user: mockUser,
            });
        });

        it('should return status 400 if an error occurs', async () => {
            authService.registerUser.mockRejectedValue(new Error('Error creating user'));

            req.body = { name: 'John', email: 'john@gmail.com', password: '123456' };

            await authController.register(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating user' });
        });
    });

    describe('login', () => {
        it('should authenticate a user and return status 200 with a token', async () => {
            const mockToken = 'abc123';
            authService.authenticateUser.mockResolvedValue(mockToken);

            req.body = { email: 'john@gmail.com', password: '123456' };

            await authController.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Authentication successful',
                token: mockToken,
            });
        });

        it('should return status 401 if authentication fails', async () => {
            authService.authenticateUser.mockRejectedValue(new Error('Authentication failed'));

            req.body = { email: 'john@gmail.com', password: '123456' };

            await authController.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
        });
    });
});
