const router = require('express').Router();
const Controller = require('../controllers/UsersController');

router.post('/signup', async (req, res) => await Controller.signUp(req, res));
router.post('/login', async (req, res) => await Controller.login(req, res));

router.post('/recovery', async (req, res) => await Controller.recovery(req, res));
router.post('/reset', async (req, res) => await Controller.reset(req, res));

router.post('/refresh', async (req, res) => await Controller.refresh(req, res));

router.get('/me', async (req, res) => await Controller.me(req, res));

module.exports = router;