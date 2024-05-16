const express = require('express');
const router = express.Router();
const db = require('../db'); 
const moment = require('moment');  // To add moment.js for date formatting

// Route to get all bookings
router.get('/', async (req, res) => {
    try {
        const [bookings] = await db.query('SELECT * FROM Booking');
        res.json(bookings);
    } catch (error) {
        console.error("Failed to retrieve bookings:", error);
        res.status(500).json({ message: "Error retrieving bookings", error: error.message });
    }
});

// Route to get a single booking by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [booking] = await db.query('SELECT * FROM Booking WHERE BookingID = ?', [id]);
        if (booking.length > 0) {
            res.json(booking[0]);
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        console.error("Failed to retrieve booking:", error);
        res.status(500).json({ message: "Error retrieving booking", error: error.message });
    }
});
// Update a booking
router.put('/:id', async (req, res) => {
    const { Course, BookingStartTime, BookingEndTime, Status } = req.body;
    try {
        const sql = 'UPDATE Booking SET Course = ?, BookingStartTime = ?, BookingEndTime = ?, Status = ? WHERE BookingID = ?';
        const [result] = await db.query(sql, [Course, BookingStartTime, BookingEndTime, Status, req.params.id]);
        if (result.affectedRows > 0) {
            res.send({ message: 'Booking updated successfully' });
        } else {
            res.status(404).send({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error("Failed to update booking:", error);
        res.status(500).send({ message: "Error updating booking", error: error.message });
    }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    try {
        const sql = 'DELETE FROM Booking WHERE BookingID = ?';
        const [result] = await db.query(sql, [req.params.id]);
        if (result.affectedRows > 0) {
            res.send({ message: 'Booking deleted successfully' });
        } else {
            res.status(404).send({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error("Failed to delete booking:", error);
        res.status(500).send({ message: "Error deleting booking", error: error.message });
    }
});

// Routes for iOS app
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const [rows] = await db.query(
            'SELECT * FROM Booking WHERE InstructorUserID = ?',
            [userId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Database query error' });
    }
});
// Add a new booking for iOS
router.post('/', async (req, res) => {
    console.log("Received booking request:", req.body);

    const { RoomID, InstructorUserID, Course, BookingStartTime, BookingEndTime, BookingDuration, Status } = req.body;

    // Convert ISO 8601 date strings to MySQL datetime format
    const formattedStartTime = moment(BookingStartTime).format('YYYY-MM-DD HH:mm:ss');
    const formattedEndTime = moment(BookingEndTime).format('YYYY-MM-DD HH:mm:ss');

    try {
        const [result] = await db.query(
            'INSERT INTO Booking (RoomID, InstructorUserID, Course, BookingStartTime, BookingEndTime, BookingDuration, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [RoomID, InstructorUserID, Course, formattedStartTime, formattedEndTime, BookingDuration, Status]
        );
        res.status(201).json({ BookingID: result.insertId });
    } catch (error) {
        console.error("Failed to create booking:", error);
        res.status(500).json({ message: "Failed to create booking", error });
    }
});

module.exports = router;
