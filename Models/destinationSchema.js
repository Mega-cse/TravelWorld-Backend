// models/destinationModel.js
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hotels: [{
    id: Number,
    name: String,
    price: String,
    image: String,
    reviews: [{
      author: String,
      rating: Number,
      comment: String,
    }],
  }],
  places: [{
    name: String,
    description: String,
    image: String,
    price: String,
    travelExpenses: String,
    food: String,
  }],
  packages: [{
    name: String,
    description: String,
    image: String,
    price: String,
    itinerary: [{
      day: Number,
      activities: String,
    }],
    hotels: [{
      name: String,
      price: String,
    }],
    food: String,
    travelExpenses: String,
  }],
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
