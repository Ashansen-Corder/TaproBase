import express from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  replyToContact
} from '../controllers/contact.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(createContact)
  .get(protect, authorize('admin'), getContacts);

router.route('/:id')
  .get(protect, authorize('admin'), getContact)
  .put(protect, authorize('admin'), updateContactStatus);

router.route('/:id/reply')
  .post(protect, authorize('admin'), replyToContact);

export default router;
