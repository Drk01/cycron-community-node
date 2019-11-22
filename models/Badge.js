const db = require('../services/database');
const Sequelize = require('sequelize');

const Badge = db.define('Badge', {
    crypto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING
    }
});

module.exports = Badge;
