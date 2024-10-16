const express = require('express');
const passport = require('passport');
const authRouter= express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
);

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));


authRouter.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
);

module.exports = authRouter;