const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3113;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Database connection
const dbURI = 'mongodb://localhost:27017/pinIt'; // Replace with your MongoDB connection string

mongoose.connect(dbURI)
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch((err) => console.log(err));