import express from 'express';
import db from '../database.js';
import checkRole from '../middleware/checkRole.js';
import upload from './upload.js';  // Import the multer configuration


const router = express.Router();

// Fetch all products
router.get('/all', async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, sortBy, sortOrder } = req.query; // Fetch query parameters

    let query = 'SELECT * FROM product WHERE 1=1';

    const queryParams = []; // This will hold our parameters for the query

    if (brand) {
      query += ' AND manufacturer = ?'; // Assuming brand is stored in the manufacturer column
      queryParams.push(brand);
    }

    if (minPrice && maxPrice) {
      query += ' AND price BETWEEN ? AND ?';
      queryParams.push(minPrice, maxPrice);
    }

    if (sortBy && sortOrder) {
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    }

    const [products] = await db.query(query, queryParams); // Execute the constructed query

    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Add a new product
router.post('/add', upload.single('productImage'), checkRole(['admin', 'admin manager']), async (req, res) => {
  const { product_model, manufacturer, price, stock_on_hand, feature_id } = req.body;
  try {
    let imagePath = null; 
    if (req.file) {
      imagePath = 'uploads/' + req.file.filename; // This is the relative path
  }

    const [result] = await db.query('INSERT INTO product (product_model, manufacturer, price, stock_on_hand, feature_id, image_path) VALUES (?, ?, ?, ?, ?, ?)', [product_model, manufacturer, price, stock_on_hand, feature_id, imagePath]);
    res.json({ success: true, message: "Product added successfully!", insertId: result.insertId });

    await db.query('INSERT INTO changelog (date_created, date_last_modified, user_id, product_id) VALUES (CURDATE(), CURDATE(), ?, ?)', [req.user.id, result.insertId]);

  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get('/stock-by-brand', async (req, res) => {
  try {
      const query = 'SELECT manufacturer, SUM(stock_on_hand) as total_stock FROM product GROUP BY manufacturer';
      const [stocks] = await db.query(query);
      res.json(stocks);
  } catch (error) {
      res.status(500).send(error.message);
  }
});


// Update an existing product
router.put('/update/:id', upload.single('productImage'), checkRole(['admin', 'admin manager']), async (req, res) => {
  const { id } = req.params;
  const { product_model, manufacturer, price, stock_on_hand, feature_id } = req.body;
  try {

    if (req.file) {
      const imagePath = 'uploads/' + req.file.filename;
      await db.query('UPDATE product SET image_path = ? WHERE product_id = ?', [imagePath, id]);
    }
    await db.query('UPDATE product SET product_model = ?, manufacturer = ?, price = ?, stock_on_hand = ?, feature_id = ? WHERE product_id = ?', [product_model, manufacturer, price, stock_on_hand, feature_id, id]);

    const [changelogEntries] = await db.query('SELECT date_created FROM changelog WHERE product_id = ?', [id]);

    if (changelogEntries.length > 0) {
        // If an entry exists, use the date_created from the existing entry for the new entry
        await db.query('INSERT INTO changelog (date_created, date_last_modified, user_id, product_id) VALUES (?, CURDATE(), ?, ?)', 
            [changelogEntries[0].date_created, req.user.id, id]);
    } else {
        // If no entry exists, use the current date for both date_created and date_last_modified
        await db.query('INSERT INTO changelog (date_created, date_last_modified, user_id, product_id) VALUES (CURDATE(), CURDATE(), ?, ?)', 
            [req.user.id, id]);
    }

    res.json({ success: true, message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Delete a product
router.delete('/delete/:id', checkRole(['admin', 'admin manager']), async (req, res) => {
  const { id } = req.params;

  try {
    // Insert record into the changelog BEFORE deleting the product to indicate an upcoming deletion
    await db.query('INSERT INTO changelog (date_created, date_last_modified, user_id, product_id) VALUES (CURDATE(), CURDATE(), ?, ?)', [req.user.id, id]);

    // Delete any existing records from changelog related to the product
    await db.query('DELETE FROM changelog WHERE product_id = ?', [id]);
    
    // Delete the product itself
    await db.query('DELETE FROM product WHERE product_id = ?', [id]);
    
    res.json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Fetch a single product by ID
// Fetch a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        product.*,
        feature.weight,
        feature.dimension,
        feature.OS,
        feature.screensize,
        feature.resolution,
        feature.CPU,
        feature.RAM,
        feature.storage,
        feature.battery,
        feature.rear_camera,
        feature.front_camera
      FROM product
      LEFT JOIN feature ON product.feature_id = feature.feature_id
      WHERE product.product_id = ?
    `;
    
    const [product] = await db.query(query, [id]);
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
