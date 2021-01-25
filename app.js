const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config'); // access .env

const logRoute = require('./routes/log');


// Instantiate server
const app = express();

// Middleware for parsing HTTP requests
app.use(bodyParser.json());

// Allow fetching
app.use(cors());

// Middleware for API routes
app.use('/logs', logRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("connected to database"); 
});

// 
const port = 8000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});