const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// ✅ CORS for frontend connection
app.use(cors({
  origin: "http://localhost:3000", // React app
  credentials: true                // allow sending cookies
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/authdb')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log(' Server running on port 5000'));
  })
  .catch(err => console.error(' MongoDB connection error:', err));
