const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: 'https://event-planner-6liq.onrender.com' // Update with your frontend's Render URL
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const eventrouter = require('./routes/eventRoutes'); // Ensure this file exists
app.use('/events', eventrouter); 
// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Default Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html')); 
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
