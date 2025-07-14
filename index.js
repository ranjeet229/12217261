
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const urlRoutes = require('./routes/urlRoutes');

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
  .catch((err) => console.error(err));
