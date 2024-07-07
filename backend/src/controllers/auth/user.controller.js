import expressAsyncHandlder from 'express-async-handler';
import bcrypt from 'bcrypt';

import User from '../../models/auth/user.model.js';
import generateToken from '../../helpers/token.js';


export const registerUser = expressAsyncHandlder(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validating the incomming request data.
        if (!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // Validating the user password strength.
        if (password.length < 6) {
            return res.status(400).json({message: 'Password must be greater then 6 character long.'});
        }

        // Checking if the user already exists.
        var existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User with this email already exists'});
        }

        // Hashing password
        const hashPassword = await bcrypt.hash(password, 10);

        // creating a new user
        const user = await User.create({ name, email, password: hashPassword });

        // generating toker with user id.
        const token = await generateToken(user._id);

        // sending backthe user and the token in the response to the client.
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            maxAge: 3 * 24 *50 * 60 * 1000,
            sameSite: true,
            secure: true,
        });
        return res.status(201).json({...user._doc, token});

    }catch(error) {
        return res.status(500).json({message: error.message});
    }
});


export const loginUser = expressAsyncHandlder(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validating the incomming request data.
        if ( !email || !password ) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // Checking if the user already exists.
        var existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({message: 'Invalid email and password'});
        }
        
        // check if the password and hash password matched
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message: 'Invalid email and password'});
        }

        // generating toker with user id.
        const token = await generateToken(existingUser._id);

        // sending backthe user and the token in the response to the client.
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            maxAge: 3 * 24 *50 * 60 * 1000,
            sameSite: true,
            secure: true,
        });
        return res.status(201).json({...existingUser._doc, token});

    }catch(error) {
        return res.status(500).json({message: error.message});
    }
});


export const logoutUser = expressAsyncHandlder(async (req, res) => {
    res.clearCookie('token');

    return res.status(200).json({message: 'User logged out'});
});


export const getUserProfile = expressAsyncHandlder(async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id).select('-password');
        return res.status(200).json(user);
    }catch(error) {
        return res.status(404).json({message: 'Unable to find profile details'});
    }
});


export const updateUserProfile = expressAsyncHandlder(async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);

        // user properties to update
        const { name, bio, photo } = req.body;

        // updating the user properties
        user.name = name || user.name; 
        user.bio = bio || user.bio;
        user.photo = photo || user.photo;

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);

    }catch(error) {
        return res.status(404).json({message: 'Unable to find profile details'});
    }
});