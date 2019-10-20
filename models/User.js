const db = require('../services/database');
const Sequelize = require('sequelize');

const User = db.define('User', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    reset_token: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = User;