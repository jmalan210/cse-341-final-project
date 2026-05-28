const router = require('express').Router();

router.use('/api-docs', require('./swagger'));
router.use('/users', require('./users'));
// router.use('/meetings', require('./meetings'));
// router.use('/books', require('./books'));
// router.use('/messages', require('./messages'));

module.exports = router;

