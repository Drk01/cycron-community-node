const Badge = require('../models/Badge');
const Op = require('sequelize').Op;

const getNews = async (req, res) => {

  const badges = await Badge.findAll({
    where: {
      votes: {
        [Op.gte]: 60
      }
    }
  });

  return res.json(badges);
};


module.exports = {
    getNews
};
