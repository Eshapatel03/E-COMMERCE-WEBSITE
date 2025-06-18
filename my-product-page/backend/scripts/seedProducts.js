const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'Product 1',
    description: 'Description for product 1',
    price: 10.99,
    image: 'https://via.placeholder.com/150',
    category: 'Clothes',
  },
  {
    name: 'Product 2',
    description: 'Description for product 2',
    price: 20.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
  },
  {
    name: 'Product 3',
    description: 'Description for product 3',
    price: 30.99,
    image: 'https://via.placeholder.com/150',
    category: 'Shoes',
  },
  {
    name: 'Product 4',
    description: 'Description for product 4',
    price: 40.99,
    image: 'https://via.placeholder.com/150',
    category: 'Furniture',
  },
  {
    name: 'Product 5',
    description: 'Description for product 5',
    price: 50.99,
    image: 'https://via.placeholder.com/150',
    category: 'Clothes',
  },
  {
    name: 'Product 6',
    description: 'Description for product 6',
    price: 60.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
  },
  {
    name: 'Product 7',
    description: 'Description for product 7',
    price: 70.99,
    image: 'https://via.placeholder.com/150',
    category: 'Shoes',
  },
  {
    name: 'Product 8',
    description: 'Description for product 8',
    price: 80.99,
    image: 'https://via.placeholder.com/150',
    category: 'Furniture',
  },
  {
    name: 'Product 9',
    description: 'Description for product 9',
    price: 90.99,
    image: 'https://via.placeholder.com/150',
    category: 'Clothes',
  },
  {
    name: 'Product 10',
    description: 'Description for product 10',
    price: 100.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
  },
];

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Sample products inserted');
  mongoose.disconnect();
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
