const express = require('express');
const UserRouter = express.Router();
const dotenv = require('dotenv');
const { loginUser, signupUser, getUser } = require('../controllers/userController.js');
const requireAuth = require('../middleware/auth.js');

dotenv.config();

UserRouter.post('/login', loginUser);

UserRouter.post('/signup', signupUser);

UserRouter.get('/user', requireAuth, getUser);

module.exports = UserRouter; 