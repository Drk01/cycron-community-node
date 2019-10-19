require('dotenv').config();
require('./services/database');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => res.status(500).json(req.body));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Servidor corriendo en puerto', process.env.PORT);
});