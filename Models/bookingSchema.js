import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    match: /.+\@.+\..+/ // Basic email format validation
  },
  phone: { 
    type: String, 
    required: true,
    match: /^\d{10}$/, // Basic phone number validation (10 digits)
  },
  date: { 
    type: Date, 
    required: true 
  },
  type: { type: String, required: true },
  // details: { type: Object, default: {} },
  totalPrice: { 
    type: Number, 
    required: true, 
    min: 0 // Ensure non-negative price
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true 
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
