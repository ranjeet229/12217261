import express from 'express';
import { createShortUrl, redirectUrl } from '../controllers/urlController.js';

const routeHandler = express.Router();

routeHandler.route('/shorturls').post(createShortUrl);
routeHandler.route('/:code').get(redirectUrl);

export default routeHandler;
