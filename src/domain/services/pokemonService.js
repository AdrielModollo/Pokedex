const xlsx = require('xlsx');
const path = require('path');

class PokemonService {
    constructor() {
        const filename = path.join(__dirname, '../../infra/repositories/models/pokemonGo.xlsx');
        const workbook = xlsx.readFile(filename);
        this.worksheet = workbook.Sheets['pokedex'];
    }

    getAll() {
        const data = xlsx.utils.sheet_to_json(this.worksheet);
        return data;
    }

    getById(id) {
        const data = xlsx.utils.sheet_to_json(this.worksheet);
        const pokemon = data.find(pokemon => pokemon.PokedexNumber === id);
        return pokemon;
    }

    getByName(name) {
        const data = xlsx.utils.sheet_to_json(this.worksheet);
        const pokemon = data.find(pokemon => pokemon.Name.toLowerCase() === name.toLowerCase());
        return pokemon;
    }

    getByType(type1, type2) {
        if (!type1 && !type2) {
            throw new Error('You must inform at least one type.');
        }

        const data = xlsx.utils.sheet_to_json(this.worksheet);
        const pokemon = data.filter(pokemon => {
            if (type1 && type2) {
                return pokemon.Type1 === type1.toLowerCase() && pokemon.Type2 === type2.toLowerCase();
            } else if (type1) {
                return pokemon.Type1 === type1.toLowerCase();
            } else if (type2) {
                return pokemon.Type2 === type2.toLowerCase();
            }
        });

        if (pokemon.length === 0) {
            throw new Error('No pokemon found with the given types.');
        }

        return pokemon;
    }
}

module.exports = PokemonService;
