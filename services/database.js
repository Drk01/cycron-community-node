const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT
});

sequelize.authenticate().then(() => {
    console.log(`Base de datos ${process.env.DBDIALECT} en linea`);
}).catch(err => {
    console.error(err);
});