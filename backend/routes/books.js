const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const { rating, priceMin, priceMax, inStock, search } = req.query;

    const filter = {};

    if (rating) filter.rating = Number(rating);

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    if (inStock === 'true') {
      filter.stock = { $regex: /in stock/i };
    } else if (inStock === 'false') {
      filter.stock = { $regex: /out of stock/i };
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Book.countDocuments(filter);

    res.json({
      page,
      limit,
      total,
      books,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
