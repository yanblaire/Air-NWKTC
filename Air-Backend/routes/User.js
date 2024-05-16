const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust this path to where your database configuration is set up

// Middleware to parse JSON bodies
router.use(express.json());

// POST route to find a user by Ethereum address
router.post('/find', async (req, res) => {
    const { ethAddress } = req.body;

    if (!ethAddress) {
        return res.status(400).json({ message: "Ethereum address is required" });
    }

    try {
        const sql = 'SELECT firstName FROM Users WHERE ethAddress = ?';
        const [user] = await db.query(sql, [ethAddress]);

        if (user.length > 0) {
            res.json({ firstName: user[0].firstName });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Error retrieving user information", error });
    }
});
// Route to add user
router.post('/add', async (req, res) => {
    const { FirstName, LastName, Password, Email, Role, EthAddress } = req.body;
    try {
        const sql = `INSERT INTO User (FirstName, LastName, Password, Email, Role, EthAddress) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(sql, [FirstName, LastName, Password, Email, Role, EthAddress]);
        res.status(201).send({ message: "User added successfully", id: result.insertId });
    } catch (error) {
        console.error("Failed to add user:", error);
        res.status(500).send({ message: "Failed to add user", error });
    }
});
// Get all users
router.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM User';
        const [users] = await db.query(sql);
        res.json(users);
    } catch (error) {
        console.error("Failed to retrieve users:", error);
        res.status(500).send({ message: "Failed to retrieve users", error });
    }
});
// Get a single user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    // Validate the userId to be numeric or a valid identifier
    if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ message: "Invalid user ID provided" });
    }

    try {
        const sql = 'SELECT * FROM User WHERE UserID = ?';
        const [rows] = await db.query(sql, [userId]);

        if (rows.length > 0) {
            res.json(rows[0]); // Send the first (and should be only) user found
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Failed to retrieve user:", error);
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
});
// Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { FirstName, LastName, Email, Password, Role } = req.body;
    try {
        const sql = `UPDATE User SET FirstName = ?, LastName = ?, Email = ?, Password = ?, Role = ? WHERE UserID = ?`;
        const [result] = await db.query(sql, [FirstName, LastName, Email, Password, Role, id]);
        if (result.affectedRows > 0) {
            res.send({ message: 'User updated successfully' });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Failed to update user:", error);
        res.status(500).send({ message: "Error updating user", error });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM User WHERE UserID = ?';
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.status(204).send(); // No content to return upon successful deletion
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Failed to delete user:", error);
        res.status(500).send({ message: "Error deleting user", error });
    }
});
// Route to find user by Ethereum address
router.post('/findUser', async (req, res) => {
    const { ethAddress } = req.body;

    if (!ethAddress) {
        return res.status(400).json({ message: "Ethereum address is required" });
    }

    try {
        const sql = 'SELECT * FROM Users WHERE ethAddress = ?';
        const [users] = await db.query(sql, [ethAddress]);

        if (users.length > 0) {
            res.json(users[0]);  // Return the first user that matches the Ethereum address
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Error retrieving user information", error: error.message });
    }
});



module.exports = router;
