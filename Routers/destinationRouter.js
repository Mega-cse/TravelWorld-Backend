// routes/destinationRouter.js
import express from 'express';
import { getAllDestinations, getDestinationByName, createDestination } from '../Controller/destinationController.js';

const router = express.Router();

// Routes for destinations
router.get('/', getAllDestinations);
router.get('/:name', getDestinationByName);
router.post('/', createDestination); // Create new destination

export default router;
