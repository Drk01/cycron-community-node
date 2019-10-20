const router = require('express').Router();
const Controller = require('../controllers/UsersController');

router.post('/signup', async (req, res) => await Controller.signUp(req, res));

module.exports = router;