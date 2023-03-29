const xlsx = require('xlsx');
const path = require('path');

class PokemonService {
    constructor() {
        this.cache = null;
        this.filename = path.join(__dirname, '../../infra/repositories/models/pokemonGo.xlsx');
        this._loadData();
    }

    _loadData() {
        const workbook = xlsx.readFile(this.filename);
        this.cache = xlsx.utils.sheet_to_json(workbook.Sheets['pokedex']);
    }

    getAll() {
        if (!this.cache) {
            this._loadData();
        }
        return this.cache;
    }

    getById(id) {
        if (!this.cache) {
            this._loadData();
        }
        const pokemon = this.cache.find(pokemon => pokemon.PokedexNumber === id);
        return pokemon;
    }

    getByName(name) {
        if (!this.cache) {
            this._loadData();
        }
        const pokemon = this.cache.find(pokemon => pokemon.Name.toLowerCase() === name.toLowerCase());
        return pokemon;
    }

    getByType(type1, type2) {
        if (!this.cache) {
            this._loadData();
        }
        if (!type1 && !type2) {
            throw new Error('You must inform at least one type.');
        }

        const pokemon = this.cache.filter(pokemon => {
            if (type1 && type2) {
                return pokemon.Type1 === type1.toLowerCase() && pokemon.Type2 === type2.toLowerCase();
            } else if (type1) {
                return pokemon.Type1 === type1.toLowerCase();
            } else if (type2) {
                return pokemon.Type2 === type2.toLowerCase();
            }
        });

        if (pokemon.length === 0) {
            return [];
        }

        return pokemon;
    }
}

module.exports = PokemonService;
