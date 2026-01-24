import express from 'express';
import {
  getAccommodations,
  getAccommodation,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  searchAccommodations
} from '../controllers/accommodations.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getAccommodations)
  .post(protect, authorize('guide', 'admin'), createAccommodation);

router.route('/search').get(searchAccommodations);

router.route('/:id')
  .get(getAccommodation)
  .put(protect, authorize('guide', 'admin'), updateAccommodation)
  .delete(protect, authorize('guide', 'admin'), deleteAccommodation);

export default router;
