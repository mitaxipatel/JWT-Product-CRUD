const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;

