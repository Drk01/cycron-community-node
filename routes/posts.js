const router = require('express').Router();
const Controller = require('../controllers/PostController');
const auth = require('../middlewares/auth');

router.get('/posts/all', async (req, res) => await Controller.all(req, res));














module.exports = router;