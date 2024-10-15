const passport = require('passport');

const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

const githubCallback = (req, res) => {
  passport.authenticate('github', { failureRedirect: '/login' })(req, res, () => {
    res.redirect('http://localhost:5173/dashboard');
  });
};

module.exports = { githubAuth, githubCallback };