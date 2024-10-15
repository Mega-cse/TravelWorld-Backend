import Booking from '../Models/bookingSchema.js';
import User from '../Models/userSchema.js'; // Assuming this is where your User model is defined
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {destinationData} from '../destinationData.js'
import mongoose from 'mongoose';


export const createBooking = async (req, res) => {
   
    console.log("Incoming booking request:", req.body);

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    let userId;

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        userId = decoded.id;
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
    }

    const { name, email, phone, date, type, bookingName } = req.body;

    if (!name || !email || !phone || !date || !type || !bookingName) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        let bookingDetails;
        let totalPrice;
        const states = ['Karnataka', 'Kerala', 'Goa', 'Tamilnadu', 'AndhraPradesh'];

        // Iterate through the states to find the booking details
        for (const state of states) {
            if (type === 'hotel') {
                bookingDetails = destinationData[state].hotels.find(h => h.name.trim() === bookingName.trim());
            } else if (type === 'place') {
                bookingDetails = destinationData[state].places.find(p => p.name.trim() === bookingName.trim());
            } else if (type === 'package') {
                bookingDetails = destinationData[state].packages.find(p => p.name.trim() === bookingName.trim());
            }

            if (bookingDetails) {
                break; // Exit the loop if bookingDetails is found
            }
        }

        if (!bookingDetails) {
            return res.status(404).json({ success: false, message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` });
        }

        totalPrice = parseFloat(bookingDetails.price.replace('₹', '').replace(',', ''));

        const booking = new Booking({
            name,
            email,
            phone,
            date,
            type,
            bookingName,
            totalPrice,
            userId,
        });

        const savedBooking = await booking.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.SECRET_KEY,
            },
        });

        const mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: 'Booking Confirmation',
            html: `<h3>Dear ${name},</h3>
                   <h3>Your booking has been confirmed!</h3>
                   <h2><strong>Details:</strong></h2>
                   <ul>
                       <li><strong>Booking Date:</strong> ${date}</li>
                       <li><strong>Booking Name:</strong> ${bookingName}</li>
                       <li><strong>Total Price:</strong> Rs.${totalPrice}</li>
                   </ul>
                   <p>Thank you for choosing us!</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'Booking created successfully', booking: savedBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ success: false, message: 'Error creating booking' });
    }
};


export const getUserBookings = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const bookings = await Booking.find({ userId: decoded.id }).populate('userId', 'username email');

        if (!bookings.length) {
            return res.status(404).json({ success: false, message: 'No bookings found for this user' });
        }

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
        }
        console.error('Error fetching bookings:', error);
        res.status(500).json({ success: false, message: 'Error fetching bookings' });
    }
}
;



export const getUserBookingsById = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const loggedInUserId = decoded.id; // Get user ID from the token

        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        if (loggedInUserId !== userId) {
            return res.status(403).json({ success: false, message: 'Forbidden: You can only access your own bookings' });
        }

        const bookings = await Booking.find({ userId }).populate('userId', 'username email');

        if (!bookings.length) {
            return res.status(404).json({ success: false, message: 'No bookings found for this user' });
        }

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
        }
        res.status(500).json({ success: false, message: 'Error fetching bookings' });
    }
};
