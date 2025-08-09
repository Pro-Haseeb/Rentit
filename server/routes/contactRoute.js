// routes/contactRoutes.js
import express from 'express';
import { submitContactForm, getAllContacts} from '../controllers/contactUsController.js';

const router = express.Router();

// POST /api/contact
router.post('/', submitContactForm);
router.get('/', getAllContacts);

export default router;
