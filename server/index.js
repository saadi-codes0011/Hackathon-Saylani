// server.js (ya index.js)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes'); // Nayi line

dotenv.config();
connectDB();

const app = express();

// 1. CORS SABSE PEHLE AAYEGA
app.use(cors()); 

// 2. JSON Parser uske baad
app.use(express.json());

// 3. ROUTES SABSE END MEIN
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes); // Nayi line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));