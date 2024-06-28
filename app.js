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


mongoose.connect('mongodb+srv://314worldgravity:Royalkaf98@cluster0.kbbf8w3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,  // Ensure SSL/TLS is enabled
    authSource: 'admin',  // Optional: specify the authentication database
    retryWrites: true,  // Optional: enable retryable writes
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
