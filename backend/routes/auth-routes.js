// authRoute.js
const express = require('express');
const passport = require('../config/passport-setup.js'); 
const authRouter = express.Router();

const redirectWithToken = (req, res) => {
  const token = req.user.token;
  res.json({ token }); // Send token in JSON response
};

// Routes for Google and GitHub OAuth

// Google OAuth routes
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), redirectWithToken);

// GitHub OAuth routes
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), redirectWithToken);

module.exports = router;
