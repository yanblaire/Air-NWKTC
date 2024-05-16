const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust according to your actual DB connection setup

// Route to get dashboard statistics
router.get('/stats', async (req, res) => {
    try {
        // Query to get total number of rooms
        const [rooms] = await db.query('SELECT COUNT(*) AS totalRooms FROM Room');
        const totalRooms = rooms[0].totalRooms;

        // Query to get available and booked rooms
        const [availableRooms] = await db.query('SELECT COUNT(*) AS available FROM Room WHERE Availability = 1');
        const [bookedRooms] = await db.query('SELECT COUNT(*) AS booked FROM Room WHERE Availability = 0');

        // Query to get user counts
        const [instructors] = await db.query('SELECT COUNT(*) AS instructors FROM User WHERE Role = "instructor"');
        const [administrators] = await db.query('SELECT COUNT(*) AS administrators FROM User WHERE Role = "administrator"');

        // Query to get recent bookings (example: last 5 bookings)
        const [totalBookings] = await db.query('SELECT COUNT(*) AS totalBookings FROM Booking');

        // Send all stats as a single JSON object
        res.json({
            totalRooms: totalRooms,
            availableRooms: availableRooms[0].available,
            bookedRooms: bookedRooms[0].booked,
            totalInstructors: instructors[0].instructors,
            totalAdministrators: administrators[0].administrators,
            totalBookings: totalBookings[0].totalBookings
        });
    } catch (error) {
        console.error("Failed to retrieve dashboard data:", error);
        res.status(500).send({ message: "Failed to retrieve dashboard data", error: error.message });
    }
});

module.exports = router;