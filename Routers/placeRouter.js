// routes/placesRoutes.js
import express from 'express';
import { getPlaces, createPlace, updatePlace, deletePlace } from '../Controller/placeController.js';

const router = express.Router();
router.get('/get', getPlaces);
router.post('/', createPlace);
router.put('/:id', updatePlace);
router.delete('/:id', deletePlace);

export default router;
