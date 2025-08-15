import express from 'express';
import Product from '../models/Product';

const router = express.Router();


// Add New Product
router.post('/add', async (req, res) => {
  try {
    const { name, description, price, image, category,colors,sizes } = req.body;
    const product = new Product({ name, description, price, image, category,colors,sizes });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
});


// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully', product: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
});

export default router;
