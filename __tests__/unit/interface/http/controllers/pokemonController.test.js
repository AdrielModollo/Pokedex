const PokemonService = require('../../../../../src/domain/services/pokemonService');
const pokemonController = require('../../../../../src/interface/http/controllers/pokemonController');

jest.mock('../../../../../src/domain/services/pokemonService');

describe('Pokemon Controller', () => {
    describe('getAll', () => {
        it('should return all pokemons', async () => {
            const mockPokemons = [{ id: 1, name: 'Bulbasaur' }, { id: 2, name: 'Charmander' }];
            PokemonService.prototype.getAll.mockResolvedValue(mockPokemons);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getAll(req, res, next);

            expect(PokemonService.prototype.getAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPokemons);
        });

    });

    describe('getById', () => {
        it('should return the pokemon with the given id', async () => {
            const mockPokemon = { id: 1, name: 'Bulbasaur' };
            PokemonService.prototype.getById.mockResolvedValue(mockPokemon);

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getById(req, res, next);

            expect(PokemonService.prototype.getById).toHaveBeenCalledTimes(1);
            expect(PokemonService.prototype.getById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPokemon);
        });

        it('should return 404 when pokemon is not found', async () => {
            PokemonService.prototype.getById.mockResolvedValue(null);

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getById(req, res, next);

            expect(PokemonService.prototype.getById).toHaveBeenCalledTimes(2);
            expect(PokemonService.prototype.getById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Pokemon not found' });
        });
    });

    describe('getByName', () => {
        it('should return the pokemon with the given name', async () => {
            const mockPokemon = { id: 1, name: 'Bulbasaur' };
            PokemonService.prototype.getByName.mockResolvedValue(mockPokemon);

            const req = { params: { name: 'bulbasaur' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getByName(req, res, next);

            expect(PokemonService.prototype.getByName).toHaveBeenCalledTimes(1);
            expect(PokemonService.prototype.getByName).toHaveBeenCalledWith('bulbasaur');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPokemon);
        });

        it('should return 404 when pokemon is not found', async () => {
            const name = 'fakepokemon';
            PokemonService.prototype.getByName.mockResolvedValueOnce(null);

            const req = { params: { name } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getByName(req, res, next);

            expect(PokemonService.prototype.getByName).toHaveBeenCalledWith(name);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Pokemon not found' });
        });

    });

    describe('getByType', () => {
        it('should return error message if no type is informed', async () => {
            const req = {
                query: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getByType(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'You must inform at least one type.' });
        });

        it('should return pokemon by type1', async () => {
            const mockPokemon = [{ name: 'Pikachu', type1: 'Electric' }, { name: 'Raichu', type1: 'Electric' }];
            PokemonService.prototype.getByType.mockResolvedValue(mockPokemon);

            const req = {
                query: { type1: 'Electric' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getByType(req, res, next);

            expect(PokemonService.prototype.getByType).toHaveBeenCalledTimes(1);
            expect(PokemonService.prototype.getByType).toHaveBeenCalledWith('Electric', undefined);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPokemon);
        });

        it('should return pokemon by type2', async () => {
            const mockPokemon = [{ name: 'Charmander', type1: 'Fire', type2: 'None' }, { name: 'Charmeleon', type1: 'Fire', type2: 'None' }];
            PokemonService.prototype.getByType.mockResolvedValue(mockPokemon);

            const req = {
                query: { type2: 'None' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getByType(req, res, next);

            expect(PokemonService.prototype.getByType).toHaveBeenCalledTimes(2);
            expect(PokemonService.prototype.getByType).toHaveBeenCalledWith(undefined, 'None');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPokemon);
        });

        it('should return pokemon by type1 and type2', async () => {
            const mockPokemon = [{ name: 'Bulbasaur', type1: 'Grass', type2: 'Poison' }];
            PokemonService.prototype.getByType.mockResolvedValue(mockPokemon);

            const req = {
                query: { type1: 'Grass', type2: 'Poison' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getByType(req, res, next);

            expect(PokemonService.prototype.getByType).toHaveBeenCalledTimes(3);
            expect(PokemonService.prototype.getByType).toHaveBeenCalledWith('Grass', 'Poison');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPokemon);
        });

        it('should return not found when no pokemon is found with the given types', async () => {
            PokemonService.prototype.getByType.mockResolvedValue([]);

            const req = {
                query: { type1: 'Water', type2: 'Electric' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            await pokemonController.getByType(req, res, next);
            expect(PokemonService.prototype.getByType).toHaveBeenCalledTimes(4);
            expect(PokemonService.prototype.getByType).toHaveBeenCalledWith('Water', 'Electric');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No pokemon found with the given types.' });
        });
    });
});

