import express from 'express';
import { createShortUrl, redirectUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/:code', redirectUrl);

export default router;
