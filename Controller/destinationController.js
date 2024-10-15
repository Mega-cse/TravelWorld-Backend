// controllers/destinationController.js
import Destination from '../Models/destinationSchema.js';

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific destination
export const getDestinationByName = async (req, res) => {
  const { name } = req.params;
  try {
    const destination = await Destination.findOne({ name });
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new destination
export const createDestination = async (req, res) => {
  const { name, hotels, places, packages } = req.body;
  try {
    const newDestination = new Destination({ name, hotels, places, packages });
    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create destination', error });
  }
};
