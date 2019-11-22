const router = require('express').Router();
const Controller = require('../controllers/TheBrainController');

router.get('/the-brain', async (req, res) => await Controller.getNews(req, res));

module.exports = router;
