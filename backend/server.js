const express = require('express');
const cors = require('cors');
const axios = require('axios');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
 
const app = express();
const port = 8000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
  githubId: String
}));

app.use(cors(
  {
    origin: 'https://gameoon.vercel.app',
    credentials: true
  }
));
app.use(express.json());
app.use(session({ 
  secret: process.env.JWT_SECRET, 
  resave: false, 
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

const RAWG_API_KEY = process.env.API_KEY;

const JWT_SECRET = process.env.JWT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        });
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = new User({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails ? profile.emails[0].value : null
        });
        await user.save();
      }
      return done(null, user);
    } catch (error) { 
      return done(error, null);
    }
  }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET);
    res.send(token);
  }
);

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET);
    res.send(token)
  }
);

app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.send(token)
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.send(token)
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error in /api/user route:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/games', async (req, res) => {
  try {
    const { search, page, genres, dates, ordering } = req.query;
    
    const params = {
      key: RAWG_API_KEY,
      page_size: 10
    };
    if (page) {
      params.page = page;
    }
    if (search) {
      params.search = search;
    }
    if (genres) {
      params.genres = genres;
    }
    if (dates) {
      params.dates = dates;
    }
    if (ordering) {
      params.ordering = ordering;
    }

    const { data } = await axios.get(`https://api.rawg.io/api/games`, { params });
    res.json(data);
  } catch (error) {
    console.error('Error fetching games:', error);  
    res.status(500).json({ error: 'Error fetching games' });
  }
});

app.get('/api/games/:id', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.rawg.io/api/games/${req.params.id}`, {
      params: {
        key: RAWG_API_KEY
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game details' });
  }
});

app.get('/api/games/:id/trailers', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.rawg.io/api/games/${req.params.id}/movies`, {
      params: {
        key: RAWG_API_KEY
      }
    });
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game trailers' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});