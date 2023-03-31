const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                const message = err.message;
                return res.sendStatus(403).json({ message: message });;
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.authenticateRegister = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || authHeader !== process.env.JWT_KEY) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
    next();
}

