// models/placeModel.js
import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  }, { timestamps: true }); // Automatically add createdAt and updatedAt fields

export default mongoose.model('Place', PlaceSchema);
