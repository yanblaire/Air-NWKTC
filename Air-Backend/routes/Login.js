const express = require('express');
const router = express.Router();
const db = require('../db'); 

// router.post('/verifyLogin', (req, res) => {
//     res.status(200).json({ message: 'Login endpoint is working' });
// });

router.post('/verifyLogin', async (req, res) => {
    const { email, password } = req.body;

    console.log('Received login request:', { email, password });

    try {
        console.log('Executing database query...');
        const [rows] = await db.query(
            'SELECT * FROM User WHERE Email = ? AND Password = ? AND Role = "instructor"',
            [email, password]
        );

        console.log('Database query results:', rows);

        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(401).json({ error: 'Invalid credentials or not an instructor' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Database query error' });
    }
});

module.exports = router;

