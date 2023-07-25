

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/MusicRegistration';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });