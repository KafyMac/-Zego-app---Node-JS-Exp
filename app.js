const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, {
    // Remove useNewUrlParser and useUnifiedTopology options
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    // Other options can be added as per your application's requirements
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
