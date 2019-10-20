const router = require('express').Router();

router.use('/v1/auth', require('./users'));

module.exports = router;