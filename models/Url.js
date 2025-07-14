import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  expiry: { type: Date, required: true },
});

export const Url = mongoose.model('Url', urlSchema);
