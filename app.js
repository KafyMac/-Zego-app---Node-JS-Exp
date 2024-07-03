const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const dotenv = require('dotenv');
const cors = require('cors');
const serverless = require("serverless-http");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

module.exports.handler = serverless(app);

// Enable CORS for all routes
app.use(cors());
mongoose.connect("mongodb+srv://314worldgravity:Royalkaf98@cluster0.kbbf8w3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    // Options to use new URL parser and ensure server discovery and monitoring are enabled
    useNewUrlParser: true, // No longer necessary but kept for backward compatibility
    useUnifiedTopology: true, // No longer necessary but kept for backward compatibility
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    // Other options can be added as per your application's requirements
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

router.get("/", (req, res) => {
    res.send("App is running..");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
