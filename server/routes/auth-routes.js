const router = require('express').Router()
const passport = require('passport')
const passportSetup = require('../config/passport-setup')
// auth login
router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    res.redirect('/')
})
 
router.get('/google', passport.authenticate('google', {
    scope : ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google', {failureRedirect : '/'}), (req, res) => {
        res.redirect('/profile/' + req.user.id)
})
module.exports = router