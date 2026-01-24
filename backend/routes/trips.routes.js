import express from 'express';
import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  getPublicTrips
} from '../controllers/trips.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All trip routes require authentication

router.route('/')
  .get(getTrips)
  .post(createTrip);

router.route('/public').get(getPublicTrips);

router.route('/:id')
  .get(getTrip)
  .put(updateTrip)
  .delete(deleteTrip);

export default router;
