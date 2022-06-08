import expresss from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app';
dotenv.config();

mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || '';

//IIFE - Immediately Invoked Function Expression
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
