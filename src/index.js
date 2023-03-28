const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./infra/database/database.js');
const errorHandling = require('./middlewares/errorHandling');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use('/users', require('./routes/usersRoute'));
app.use('/authenticate', require('./routes/authRoute'));
app.use('/pokemon', require('./routes/pokemonRoute'));

//error handling
app.use(errorHandling.notFound);
app.use(errorHandling.internalServerError);

//sync database
sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(3000);
    })
    .catch(err => console.log(err));