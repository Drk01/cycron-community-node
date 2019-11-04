const router = require('express').Router();

router.use('/v1/auth', require('./users'));
router.use('/v1/', require('./posts'));

module.exports = router;