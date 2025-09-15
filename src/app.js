const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3113;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Database connection
const dbURI = 'mongodb://localhost:27017/pinIt'; 

mongoose.connect(dbURI)
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch((err) => console.log(err));  