const db = require('../services/database');
const Sequelize = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

const Post = db.define('Post', {
    image: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.TEXT
    },
    number_of_visits: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    important: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    published_by: {
        type: Sequelize.INTEGER
    }
});

sequelizePaginate.paginate(Post);
module.exports = Post;
