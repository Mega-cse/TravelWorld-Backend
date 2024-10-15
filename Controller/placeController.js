// controllers/placesController.js
import Place from '../Models/placeSchema.js';

const getPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Server error');
    }
};

const createPlace = async (req, res) => {
    const { name, image } = req.body;
    if (!name || !image) {
        return res.status(400).send('Name and image are required');
    }
    
    try {
        const newPlace = new Place(req.body);
        await newPlace.save();
        res.status(201).json(newPlace);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send('Error creating place');
    }
};

const updatePlace = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPlace = await Place.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedPlace) {
            res.json(updatedPlace);
        } else {
            res.status(404).send('Place not found');
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send('Error updating place');
    }
};

const deletePlace = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPlace = await Place.findByIdAndDelete(id);
        if (deletedPlace) {
            res.json(deletedPlace);
        } else {
            res.status(404).send('Place not found');
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Server error');
    }
};

export { getPlaces, createPlace, updatePlace, deletePlace };
