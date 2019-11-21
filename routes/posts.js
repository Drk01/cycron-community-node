const router = require('express').Router();
const Controller = require('../controllers/PostController');
const auth = require('../middlewares/auth');

router.get('/posts/all', async (req, res) => await Controller.all(req, res));
router.get('/posts', async (req, res) => await Controller.posts(req, res));

router.post('/posts/store', auth, async (req, res) => await Controller.store(req, res));
router.delete('/posts/destroy/:id', auth, async (req, res) => await Controller.destroy(req, res));
router.get('/posts/get/:id', async (req, res) => await Controller.getById(req, res));
router.post('/posts/image/content', auth, async (req, res) => await Controller.imageContent(req, res));
router.post('/posts/update/:id', auth, async (req, res) => await Controller.update(req, res));










module.exports = router;
