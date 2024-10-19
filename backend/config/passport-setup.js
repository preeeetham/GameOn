const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models/userModel.js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); // Ensure JWT is required
dotenv.config();

// Serialize the user ID into the session
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize the user from the session using their ID
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// Create JWT token for user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d', // Token expiration: 3 days
  });
};

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:8000/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists in the database
    const existingUser = await User.findOne({
      providerId: profile.id,
      provider: 'google',
    });

    if (existingUser) {
      const token = createToken(existingUser._id);
      return done(null, { user: existingUser, token }); // Return user and token
    }

    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    // Create a new user if not found
    const newUser = await new User({
      name: profile.displayName,
      email: email,
      provider: 'google',
      providerId: profile.id,
    }).save();

    const token = createToken(newUser._id); // Create a token for the new user
    done(null, { user: newUser, token }); // Return user and token
  } catch (error) {
    done(error, null);
  }
}));

// GitHub OAuth strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'http://localhost:8000/api/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists in the database
    const existingUser = await User.findOne({
      providerId: profile.id,
      provider: 'github',
    });

    if (existingUser) {
      const token = createToken(existingUser._id);
      return done(null, { user: existingUser, token }); // Return user and token
    }

    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    // Create a new user if not found
    const newUser = await new User({
      name: profile.displayName,
      email: email,
      provider: 'github',
      providerId: profile.id,
    }).save();

    const token = createToken(newUser._id); // Create a token for the new user
    done(null, { user: newUser, token }); // Return user and token
  } catch (error) {
    done(error, null);
  }
}));

module.exports = passport;
