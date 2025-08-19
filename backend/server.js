const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const stockRoutes = require('./routes/stockRoutes');
const predictRoutes = require('./routes/predictRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/stock', stockRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
