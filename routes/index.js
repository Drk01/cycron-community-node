const router = require('express').Router();

router.use('/v1/auth', require('./users'));
router.use('/v1/auth', require('./posts'));

module.exports = router;