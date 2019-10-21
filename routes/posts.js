const router = require('express').Router();
const Controller = require('../controllers/PostController');
const auth = require('../middlewares/auth');

router.get('/posts/all', async (req, res) => await Controller.all(req, res));
router.get('/posts', async (req, res) => await Controller.posts(req, res));

router.delete('/posts/destroy/:id', async (req, res) => await Controller.destroy(req, res));












module.exports = router;