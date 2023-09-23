import express from 'express';
import db from '../database.js';


const router = express.Router();

// Fetch all products
router.get('/all', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM product');
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new product
router.post('/add', async (req, res) => {
  const { product_model, manufacturer, price, stock_on_hand, feature_id } = req.body;
  try {
    const [result] = await db.query('INSERT INTO product (product_model, manufacturer, price, stock_on_hand, feature_id) VALUES (?, ?, ?, ?, ?)', [product_model, manufacturer, price, stock_on_hand, feature_id]);
    res.json({ success: true, message: "Product added successfully!", insertId: result.insertId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an existing product
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { product_model, manufacturer, price, stock_on_hand, feature_id } = req.body;
  try {
    await db.query('UPDATE product SET product_model = ?, manufacturer = ?, price = ?, stock_on_hand = ?, feature_id = ? WHERE product_id = ?', [product_model, manufacturer, price, stock_on_hand, feature_id, id]);
    res.json({ success: true, message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a product
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM product WHERE product_id = ?', [id]);
    res.json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await db.query('SELECT * FROM product WHERE product_id = ?', [id]);
    if (product.length) {
      res.json(product[0]);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

