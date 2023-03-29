const PokemonService = require('../../../../src/domain/services/pokemonService');

describe('PokemonService', () => {
    let pokemonService;

    beforeAll(() => {
        pokemonService = new PokemonService();
    });

    describe('getAll()', () => {
        it('should return an array of Pokemon', () => {
            const pokemonList = pokemonService.getAll();

            expect(Array.isArray(pokemonList)).toBe(true);

            pokemonList.forEach(pokemon => {
                expect(typeof pokemon).toBe('object');
                expect(pokemon.PokedexNumber).toBeDefined();
                expect(pokemon.Name).toBeDefined();
                expect(pokemon.Type1).toBeDefined();
            });
        });
    });

    describe('getById()', () => {
        it('should return a Pokemon object with the specified PokedexNumber', () => {
            const pokemon = pokemonService.getById(1);

            expect(pokemon).toBeDefined();
            expect(typeof pokemon).toBe('object');
            expect(pokemon.PokedexNumber).toBe(1);
            expect(pokemon.Name).toBeDefined();
            expect(pokemon.Type1).toBeDefined();
        });

        it('should return undefined if the specified PokedexNumber does not exist', () => {
            const pokemon = pokemonService.getById(10000);

            expect(pokemon).toBeUndefined();
        });
    });



});