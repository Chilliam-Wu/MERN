const mongoose = require('mongoose');
const config = require('config');
const dbCloud = config.get('mongoDBCloud');

const connectDB = async () => {
  try {
    await mongoose.connect(dbCloud);
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error(error.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
