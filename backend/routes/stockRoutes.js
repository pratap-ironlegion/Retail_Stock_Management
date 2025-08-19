const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products ORDER BY quantity ASC', (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.json(results);
  });
});

// Get product names
router.get('/names', (req, res) => {
  db.query('SELECT name FROM products', (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, names: results.map(r => r.name) });
  });
});

// Add new product
router.post('/add', (req, res) => {
  const { name, quantity, criticalLimit } = req.body;
  db.query('SELECT * FROM products WHERE name = ?', [name], (err, rows) => {
    if (rows.length > 0) {
      return res.json({ success: false, message: '❌ Product already exists' });
    }
    db.query('INSERT INTO products (name, quantity, criticalLimit) VALUES (?, ?, ?)',
      [name, quantity, criticalLimit],
      (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true, message: '✅ Product added successfully' });
      });
  });
});

// Update product stock
router.post('/update', (req, res) => {
  const { name, change } = req.body;
  db.query('SELECT * FROM products WHERE name = ?', [name], (err, rows) => {
    if (rows.length === 0) return res.json({ success: false, message: 'Product not found' });
    const currentQty = rows[0].quantity;
    const newQty = currentQty + change;
    if (newQty < 0) return res.json({ success: false, message: '❌ Quantity cannot go below 0' });

    db.query('UPDATE products SET quantity = ? WHERE name = ?', [newQty, name], (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true, message: '✅ Stock updated successfully' });
    });
  });
});


// Delete product (expects JSON body)
router.delete('/delete', (req, res) => {
  const { name } = req.body;

  db.query('DELETE FROM products WHERE name = ?', [name], (err, result) => {
    if (err) {
      console.error('❌ Error deleting product:', err);
      return res.status(500).json({ success: false, message: 'Error deleting product' });
    }
    if (result.affectedRows === 0) {
      return res.json({ success: false, message: '⚠️ Product not found' });
    }
    res.json({ success: true, message: '✅ Product deleted successfully' });
  });
});




module.exports = router;
