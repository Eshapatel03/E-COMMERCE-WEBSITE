const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products?limit=10&skip=0
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;

  try {
    const products = await Product.find().skip(skip).limit(limit);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
