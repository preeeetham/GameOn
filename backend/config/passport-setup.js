const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models/userModel.js');
const dotenv = require('dotenv');
dotenv.config();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:8000/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({
      providerId: profile.id,
      provider: 'google'
    });
    if (existingUser) {
      return done(null, existingUser);
    }

    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    const newUser = await new User({
      name: profile.displayName,
      email: email,
      provider: 'google',
      providerId: profile.id
    }).save();

    done(null, newUser);
  } catch (error) {
    done(error, null);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'http://localhost:8000/api/auth/github/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({
      providerId: profile.id,
      provider: 'github'
    });
    if (existingUser) {
      return done(null, existingUser);
    }

    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    const newUser = await new User({
      name: profile.displayName,
      email: email,
      provider: 'github',
      providerId: profile.id
    }).save();

    done(null, newUser);
  } catch (error) {
    done(error, null);
  }
}));
