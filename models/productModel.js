const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required. Please provide a valid product name.']
  },
  description: {
    type: String,
    required: [true, 'Description is required. Please provide a valid product description.']
  },
  price: {
    type: Number,
    required: [true, 'Price is required. Please provide a valid price.'],
    min: [0, 'Price must be a positive number.']
  },
  category: {
    type: String,
    required: [true, 'Category is required. Please provide a valid product category.']
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required. Please provide a valid stock quantity.'],
    min: [0, 'Stock quantity cannot be negative.']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'onedaouser',
    required: true
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
