const router = require('express').Router();

router.use('/v1/auth', require('./users'));
router.use('/v1/', require('./posts'));
router.use('/v1', require('./the-brain'));

module.exports = router;