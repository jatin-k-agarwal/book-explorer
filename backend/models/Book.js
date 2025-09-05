const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },       // indexed for search
  price: { type: Number, index: true },
  stock: { type: String, index: true },
  rating: { type: Number, index: true },
  detailUrl: { type: String },
  thumbnailUrl: { type: String },
}, { timestamps: true }); // adds createdAt and updatedAt fields

module.exports = mongoose.model('Book', bookSchema);
