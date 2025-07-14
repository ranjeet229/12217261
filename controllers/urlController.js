import { Url } from '../models/Url.js';
import { nanoid } from 'nanoid';

export const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  try {
    const code = shortcode || nanoid(6);
    const expiry = new Date(Date.now() + validity * 60000);

    const existing = await Url.findOne({ shortcode: code });
    if (existing && !shortcode) return createShortUrl(req, res);
    if (existing) return res.status(409).json({ message: 'Shortcode already exists' });

    const newUrl = new Url({ originalUrl: url, shortcode: code, expiry });
    await newUrl.save();

    res.status(201).json({
      shortLink: `http://localhost:5000/${code}`,
      expiry: expiry.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const urlData = await Url.findOne({ shortcode: req.params.code });

    if (!urlData) return res.status(404).json({ message: 'Shortcode not found' });
    if (new Date() > urlData.expiry) return res.status(410).json({ message: 'Link expired' });

    res.redirect(urlData.originalUrl);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
