const express = require('express');
const router = express.Router();
const { createShortUrl, redirectUrl } = require('../controllers/urlController');

router.post('/shorturls', createShortUrl);
router.get('/:code', redirectUrl);

module.exports = router;
