import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/userSchema.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
// Register a new user
export const register = async (req, res) => {
    const { username, email, password, location, phoneNumber, age, dateOfBirth } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            location,
            phoneNumber,
            age,
            dateOfBirth,
        });

        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({
            success: true,
            message: 'Logged in successfully',
            user: { id: user._id, username: user.username, email: user.email },
            token, // Include the token in the response
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error, please try again later' });
    }
};


// Handle password reset request
export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const randomString = crypto.randomBytes(20).toString('hex');
        const expirationTimestamp = Date.now() + 3600000; // 1 hour

        user.randomString = randomString;
        user.expirationTimestamp = expirationTimestamp;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.SECRET_KEY,
            },
        });

        const resetURL = `${process.env.RESET_URL}/reset-password/${randomString}`;

        await transporter.sendMail({
            from: process.env.MAIL,
            to: user.email,
            subject: 'Password Reset Request',
            text: `Dear ${user.username},\n\nYou requested a password reset. Please use the following link to reset your password:\n${resetURL}\n\nThis link will expire in 1 hour. If you did not request a password reset, please ignore this email.`,
            html: `<p>Dear ${user.username},</p>
                   <p>You requested a password reset. Please use the following link to reset your password:</p>
                   <p><a href="${resetURL}">${resetURL}</a></p>
                   <p>This link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>`,
        });

        res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error("Error in forgetPassword:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Reset user password
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            randomString: token,
            expirationTimestamp: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.randomString = null;
        user.expirationTimestamp = null;
        await user.save();

        res.status(200).json({ message: "Your new password has been updated" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Logout user
export const logoutUser = (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            expires: new Date(0),
        });

        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get authenticated user's profile
export const UserProfile = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



// Get user profile by ID
export const getUserProfileById = async (req, res) => {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ data: user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};