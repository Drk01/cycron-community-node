const router = require('express').Router();
const Controller = require('../controllers/UsersController');

router.post('/signup', async (req, res) => await Controller.signUp(req, res));

router.post('/login', async (req, res) => await Controller.login(req, res));

module.exports = router;