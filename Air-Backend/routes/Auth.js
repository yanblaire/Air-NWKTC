// Auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust the path to db.js as necessary

router.post('/verifyAdmin', async (req, res) => {
  const { ethAddress } = req.body;
  try {
    const query = 'SELECT Role FROM User WHERE EthAddress = ?';
    const [rows] = await pool.execute(query, [ethAddress]);

    if (rows.length > 0 && rows[0].Role === 'administrator') {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Server error');
  }
});

router.post('/find', async (req, res) => {
  const { ethAddress } = req.body;
  const sql = 'SELECT FirstName, LastName FROM User WHERE EthAddress = ?';
  try {
      const result = await db.query(sql, [ethAddress]);
      if (result.length > 0) {
          const user = result[0];
          res.json({ firstName: user.FirstName, lastName: user.LastName });
      } else {
          res.status(404).send({ message: "No user found with that Ethereum address." });
      }
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send({ message: "Failed to retrieve user data", error });
  }
});

module.exports = router;
