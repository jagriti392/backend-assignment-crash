const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

// Create a write stream (in append mode) to the access.log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'src', 'access.log'), { flags: 'a' });

// Setup Morgan to log requests using the specified format
app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] HTTP/:http-version :url', { stream: accessLogStream }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define Routes
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Home Page');
});

app.get('/get-users', (req, res) => {
    res.status(200).json({ message: 'List of Users' });
});

app.post('/add-user', (req, res) => {
    res.status(201).json({ message: 'User added successfully' });
});

app.put('/user/:id', (req, res) => {
    res.status(201).json({ message: `User with ID ${req.params.id} updated successfully` });
});

app.delete('/user/:id', (req, res) => {
    res.status(200).json({ message: `User with ID ${req.params.id} deleted successfully` });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
