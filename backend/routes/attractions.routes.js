import express from 'express';
import {
  getAttractions,
  getAttraction,
  createAttraction,
  updateAttraction,
  deleteAttraction,
  searchAttractions
} from '../controllers/attractions.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getAttractions)
  .post(protect, authorize('admin'), createAttraction);

router.route('/search').get(searchAttractions);

router.route('/:id')
  .get(getAttraction)
  .put(protect, authorize('admin'), updateAttraction)
  .delete(protect, authorize('admin'), deleteAttraction);

export default router;
