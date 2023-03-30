const xlsx = require('xlsx');
const path = require('path');

class PokemonService {
    constructor() {
        this.cache = null;
        this.filename = path.join(__dirname, '../../infra/repositories/models/pokemonGo.xlsx');
        this.loadData();
    }

    loadData() {
        const workbook = xlsx.readFile(this.filename);
        this.cache = xlsx.utils.sheet_to_json(workbook.Sheets['pokedex']);
    }

    getAll() {
        this.loadData();
        return this.cache;
    }

    getById(id) {
        this.loadData();
        return this.cache.find(pokemon => pokemon.PokedexNumber === id);
    }

    getByName(name) {
        this.loadData();
        return this.cache.find(pokemon => pokemon.Name.toLowerCase() === name.toLowerCase());
    }

    getByType(type1, type2) {
        this.loadData();
        if (!type1 && !type2) {
            throw new Error('You must inform at least one type.');
        }

        const pokemon = this.cache.filter(pokemon => {
            if (type1 && type2) {
                return pokemon.Type1 === type1.toLowerCase() || pokemon.Type2 === type2.toLowerCase();
            } else if (type1) {
                return pokemon.Type1 === type1.toLowerCase();
            } else if (type2) {
                return pokemon.Type2 === type2.toLowerCase();
            }
        });

        return pokemon;
    }
}

module.exports = PokemonService;
