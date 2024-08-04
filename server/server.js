const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./config/db');
require('dotenv').config();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const mailRouter = require('./routes/mailRoutes');

// Connect to MongoDB
connectToDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // To set up a basic logger
app.use((req, res, next) => {
    console.log(req.headers.authorization);
    next();
})

// Routes
app.use('/api/users', userRouter);
app.use('/api/connect', mailRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));