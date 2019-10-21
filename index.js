require('dotenv').config();
require('./services/database');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(require('./routes/index'));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Servidor corriendo en puerto', process.env.PORT);
});