const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
const eventRoutes = require('./event_planner/routes/eventRoutes');

require('dotenv').config();

const PORT = 4000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.DB_URI
    // useNewUrlParser: true,
    // useUnifiedTopology: true
)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const eventrouter = require('../event_planner/routes/eventRoutes'); // Adjust path based on your file structure
app.use('/', eventrouter);
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','index.html'));
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
