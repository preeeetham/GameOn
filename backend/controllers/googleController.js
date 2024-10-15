const passport = require('passport');

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleCallback = (req, res) => {
  passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
    res.redirect('http://localhost:5173/dashboard');
  });
};

module.exports = { googleAuth, googleCallback };