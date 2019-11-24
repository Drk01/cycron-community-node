const db = require('../services/database');
const Sequelize = require('sequelize');

const Badge = db.define('Badge', {
    //Empresa(s) anunciante(s)
    companies: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //Porcentaje de votos del evento
    votes: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    //Título del evento
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //Fecha del evento
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    // Descripción del evento
    description:{
        type: Sequelize.STRING
    },
    // Fuente del evento
    source:{
      type: Sequelize.STRING,
      allowNull: false
    }
});

module.exports = Badge;
