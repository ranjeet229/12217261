import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

export const Url = mongoose.model('ShortenedUrl', ShortUrlSchema);
