require('dotenv').config();
require('./services/database');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

/**
 * Función asíncrona que accionará el scrapper una vez cada día
 * @type {[null]}
 */
const TheBrainCron = require('./services/TheBrainCronJob');
TheBrainCron.scrapeBadges();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use('/v1', express.static(path.join(__dirname, 'public')));
app.use(require('./routes/index'));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Servidor corriendo en puerto', process.env.PORT);
});
