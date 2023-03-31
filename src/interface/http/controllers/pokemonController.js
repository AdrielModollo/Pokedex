const PokemonService = require('../../../domain/services/pokemonService');

const pokemonService = new PokemonService();

exports.getAll = async (req, res, next) => {
    const data = await pokemonService.getAll();
    res.status(200).json(data);
};

exports.getById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const pokemon = await pokemonService.getById(id);

    if (pokemon) {
        res.status(200).json(pokemon);
    } else {
        res.status(404).json({ message: 'Pokemon not found' });
    }
};

exports.getByName = async (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const pokemon = await pokemonService.getByName(name);

    if (pokemon) {
        res.status(200).json(pokemon);
    } else {
        res.status(404).json({ message: 'Pokemon not found' });
    }
};

exports.getByType = async (req, res, next) => {
    const type1 = req.query.type1;
    const type2 = req.query.type2;

    if (!type1 && !type2) {
        return res.status(400).json({ message: 'You must inform at least one type.' });
    }

    const pokemon = await pokemonService.getByType(type1, type2);

    if (pokemon.length > 0) {
        res.status(200).json(pokemon);
    } else {
        res.status(404).json({ message: 'No pokemon found with the given types.' });
    }
};
