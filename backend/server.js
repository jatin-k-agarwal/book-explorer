const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const booksRouter = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookexplorer';

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found. Please set it in your .env file or Render environment variables.");
  process.exit(1); // Exit if no MongoDB URI
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Use the books router
app.use('/api/books', booksRouter);

// Centralized error handler middleware
app.use((err, req, res, next) => {
  console.error("⚠️ Error middleware:", err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
