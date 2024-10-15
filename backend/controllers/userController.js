const { User } = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const dotenv = require('dotenv');

dotenv.config();

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    })
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message: "Please enter all fields"})
        }
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const signupUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const exists = await User.findOne({email})
        if(exists){
            return res.status(400).json({message: "User already exists"})
        }
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
            return res.status(400).json({message: "Please enter all fields"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Please enter a valid email"})
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({message: "Please enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(200).json({user, token})

    } catch(error){
        res.status(500).json({message: error.message})
    }
}

const getUser = async(req, res) => {
    const id = req.user.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    loginUser,
    signupUser,
    getUser
}