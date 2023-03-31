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

    describe('getByName()', () => {
        it('should return a Pokemon object with the specified name', () => {
            const pokemon = pokemonService.getByName('Bulbasaur');

            expect(pokemon).toBeDefined();
            expect(typeof pokemon).toBe('object');
            expect(pokemon.PokedexNumber).toBeDefined();
            expect(pokemon.Name.toLowerCase()).toBe('bulbasaur');
            expect(pokemon.Type1).toBeDefined();
        });

        it('should return undefined if the specified name does not exist', () => {
            const pokemon = pokemonService.getByName('Invalid Name');

            expect(pokemon).toBeUndefined();
        });
    });

    describe('getByType()', () => {
        it('should return an array of Pokemon with both specified types', () => {
            const pokemonService = new PokemonService();
            const pokemonList = pokemonService.getByType('grass', 'poison');
            expect(Array.isArray(pokemonList)).toBe(true);

            pokemonList.forEach(pokemon => {
                expect(typeof pokemon).toBe('object');
                expect(pokemon.PokedexNumber).toBeDefined();
                expect(pokemon.Name).toBeDefined();
                expect(pokemon.Type1.toLowerCase()).toBe('grass');
                expect(pokemon.Type2.toLowerCase()).toBe('poison');
                expect(pokemon.Type1.toLowerCase() === 'grass' && pokemon.Type2.toLowerCase() === 'poison').toBe(true);
            });
        });

        it('should throw an error if no types are provided', () => {
            const pokemonService = new PokemonService();

            expect(() => pokemonService.getByType()).toThrow('You must inform at least one type.');
        });


        it('should return an array of Pokemon with the specified type1', () => {
            const pokemonService = new PokemonService();
            const pokemonList = pokemonService.getByType('fire');
            expect(Array.isArray(pokemonList)).toBe(true);

            pokemonList.forEach(pokemon => {
                expect(typeof pokemon).toBe('object');
                expect(pokemon.PokedexNumber).toBeDefined();
                expect(pokemon.Name).toBeDefined();
                expect(pokemon.Type1.toLowerCase()).toBe('fire');
                expect(pokemon.Type1.toLowerCase() === 'fire').toBe(true);
            });
        });

        it('should return an array of Pokemon with the specified type2', () => {
            const pokemonService = new PokemonService();
            const pokemonList = pokemonService.getByType(null, 'flying');
            expect(Array.isArray(pokemonList)).toBe(true);

            pokemonList.forEach(pokemon => {
                expect(typeof pokemon).toBe('object');
                expect(pokemon.PokedexNumber).toBeDefined();
                expect(pokemon.Name).toBeDefined();
                expect(pokemon.Type1.toLowerCase()).not.toBe('flying');
                expect(pokemon.Type2.toLowerCase()).toBe('flying');
            });
        });

        it('should throw an error if no type is provided', () => {
            const pokemonService = new PokemonService();
            expect(() => pokemonService.getByType()).toThrow('You must inform at least one type.');
        });

        it('should return an empty array if no Pokemon with the specified types is found', () => {
            const pokemonService = new PokemonService();
            const pokemonList = pokemonService.getByType('fire', 'water');
            expect(Array.isArray(pokemonList)).toBe(true);
        });

        it('should return an empty array if the specified type does not exist', () => {
            const pokemonList = pokemonService.getByType('Invalid Type');
            expect(Array.isArray(pokemonList)).toBe(true);
            expect(pokemonList).toHaveLength(0);

        });
    });
});