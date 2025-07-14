import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.js';
import routeHandler from './routes/urlRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(logger);
app.use('/', routeHandler);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error.message);
  }
};

startApp();
