import express from 'express';
import { createBooking, getUserBookings, getUserBookingsById } from '../Controller/bookingController.js';

const router = express.Router();

// POST: Create a new booking with authentication
router.post('/create',createBooking); // Add the middleware here

// GET: Get all bookings for the authenticated user
router.get('/user', getUserBookings); // Protect this route too
router.get('/user/:userId', getUserBookingsById); 
export default router;
