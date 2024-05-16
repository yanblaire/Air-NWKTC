const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path as necessary to import your database connection

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Room');
        res.json(rows);
    } catch (error) {
        console.error("Failed to retrieve rooms:", error);
        res.status(500).send({ message: "Failed to retrieve rooms", error });
    }
});

// Get a single room by ID
router.get('/:id', async (req, res) => {
    const roomId = req.params.id;

    // Validate the roomId to be numeric or a valid identifier
    if (!roomId || isNaN(parseInt(roomId))) {
        return res.status(400).json({ message: "Invalid room ID provided" });
    }

    try {
        const sql = 'SELECT * FROM Room WHERE RoomID = ?';
        const [rows] = await db.query(sql, [roomId]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        console.error("Failed to retrieve room:", error);
        res.status(500).json({ message: "Error retrieving room", error: error.message });
    }
});

// POST route to add a new room
router.post('/add', async (req, res) => {
    const { RoomName, Capacity, Availability } = req.body;
    const sql = `
        INSERT INTO Room (RoomName, Capacity, Availability)
        VALUES (?, ?, ?)
    `;
    try {
        const [result] = await db.query(sql, [RoomName, Capacity, Availability]);
        res.status(201).send({ message: "Room added successfully", id: result.insertId });
    } catch (error) {
        console.error("Failed to add room:", error);
        res.status(500).send({ message: "Failed to add room", error });
    }
});

// Update Room Details
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { RoomName, Capacity, Availability } = req.body;
    try {
        const sql = 'UPDATE Room SET RoomName = ?, Capacity = ?, Availability = ? WHERE RoomID = ?';
        const [result] = await db.query(sql, [RoomName, Capacity, Availability, id]);
        if (result.affectedRows > 0) {
            res.send({ message: 'Room updated successfully' });
        } else {
            res.status(404).send({ message: 'Room not found' });
        }
    } catch (error) {
        console.error("Failed to update room:", error);
        res.status(500).send({ message: "Error updating room", error });
    }
});


// Delete Room
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Room WHERE RoomID = ?', [id]);
        if (result.affectedRows > 0) {
            res.send({ message: 'Room deleted successfully' });
        } else {
            res.status(404).send({ message: 'Room not found' });
        }
    } catch (error) {
        console.error("Failed to delete room:", error);
        res.status(500).send({ message: "Error deleting room", error });
    }
});



// Route to update room availability to 0 (false) using RoomID
router.put('/updateAvailability/:id', async (req, res) => {
    const RoomID = req.params.id;

    // Log received RoomID
    console.log(`Received RoomID: ${RoomID}`);

    try {
        const [result] = await db.query(
            'UPDATE Room SET Availability = 0 WHERE RoomID = ? AND Availability = 1',
            [RoomID]
        );

        if (result.affectedRows === 0) {
            console.log("Room not found or not  available");
            return res.status(404).json({ message: "Room not found or already available" });
        }

        const [updatedRoom] = await db.query('SELECT * FROM Room WHERE RoomID = ?', [RoomID]);

        console.log("Updated Room: ", updatedRoom[0]);

        res.status(200).json(updatedRoom[0]);
    } catch (error) {
        console.error("Failed to update room availability:", error);
        res.status(500).json({ message: "Failed to update room availability", error });
    }
});




module.exports = router;
