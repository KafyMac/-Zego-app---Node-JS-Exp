const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const routes = require('./routes/index');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL || "", {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    tls: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes
app.use('/', routes);

// Middleware
app.use(express.json());

// Create and start the server
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
