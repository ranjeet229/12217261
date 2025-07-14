import { Url } from '../models/Url.js';
import { nanoid } from 'nanoid';

export const createShortUrl = async (req, res) => {
  const { url: originalUrl, validity = 30, shortcode: customCode } = req.body;

  try {
    const shortCode = customCode || nanoid(6);
    const expirationTime = new Date(Date.now() + validity * 60 * 1000);

    const existingEntry = await Url.findOne({ shortcode: shortCode });

    if (existingEntry) {
      if (!customCode) {
        return createShortUrl(req, res); 
      }
      return res.status(409).json({ message: 'shortcode already taken.' });
    }

    const newEntry = new Url({
      originalUrl,
      shortcode: shortCode,
      expiry: expirationTime,
    });

    await newEntry.save();

    return res.status(201).json({
      shortLink: `http://localhost:8000/${shortCode}`,
      expiry: expirationTime.toISOString(),
    });

  } catch (error) {
    return res.status(500).json({ message: 'error occurred', error: error.message });
  }
};

export const redirectUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const record = await Url.findOne({ shortcode: code });

    if (!record) {
      return res.status(404).json({ message: 'This shortcode does not exist' });
    }

    if (new Date() > record.expiry) {
      return res.status(410).json({ message: 'The link has expired' });
    }

    return res.redirect(record.originalUrl);

  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
