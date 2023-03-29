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


});