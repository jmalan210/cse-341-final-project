const router = require('express').Router();
const passport = require('passport');

router.use('/api-docs', require('./swagger'));
router.use('/users', require('./users'));
router.use('/meetings', require('./meetings'));
router.use('/books', require('./books'));
router.use('/messages', require('./messages'));

router.get('/login', passport.authenticate('github'));

router.get('/logout', function (req, res, next) {
    req.logout((err) => {
        if (err) 
            return next(err); 

        //logic to delete session and clear cookies for video demonstration
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
});

module.exports = router;

