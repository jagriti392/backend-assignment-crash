const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



function validateTodoData(req, res, next) {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;

    const errors = [];

    // Validate each field
    if (typeof ID !== 'number') errors.push('ID must be a number.');
    if (typeof Name !== 'string') errors.push('Name must be a string.');
    if (typeof Rating !== 'number') errors.push('Rating must be a number.');
    if (typeof Description !== 'string') errors.push('Description must be a string.');
    if (typeof Genre !== 'string') errors.push('Genre must be a string.');
    if (!Array.isArray(Cast) || !Cast.every(item => typeof item === 'string')) {
        errors.push('Cast must be an array of strings.');
    }

    // Check for validation errors
    if (errors.length > 0) {
        return res.status(400).json({
            message: 'bad request. some data is incorrect.',
            errors
        });
    }

    next(); // Proceed to the next middleware or route handler
}

app.post('/', validateTodoData, (req, res) => {
    res.status(200).send('data received');
});
