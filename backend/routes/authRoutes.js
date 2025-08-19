const express = require('express');
const router = express.Router();

const USER = { username: "admin", password: "admin123" };

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
