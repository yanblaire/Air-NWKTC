require('dotenv').config(); // Load environment variables at the very top

const express = require('express');
const app = express();
const db = require('./db');  // Ensures db.js is loaded and the pool is initialized

app.use(express.json()); // Parse JSON bodies

const cors = require('cors');
app.use(cors()); // Enable CORS

// Import the room routes
const roomRoutes = require('./routes/Room');
app.use('/api/room', roomRoutes); // Use the room routes
// Import the room routes

const authRoutes = require('./routes/Auth'); // Ensure you have the Auth route set up
app.use('/api/auth', authRoutes);

// Import the user routes
const userRoutes = require('./routes/User');
app.use('/api/user', userRoutes); // Use the user routes

// Import the booking routes
const bookingRoutes = require('./routes/Booking');
app.use('/api/booking', bookingRoutes); // Use the booking routes

// Import the dashboard routes
const dashboardRoutes = require('./routes/Dashboard');
app.use('/api/dashboard', dashboardRoutes); // Use the dashboard routes


// For IOS
// Import the login routes for ios
const loginRoute = require('./routes/Login');
app.use('/api/login', loginRoute);

// Log registered routes for debugging
app._router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
