import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
