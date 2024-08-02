// index.js

// Import the crypto module
const crypto = require('crypto');

// Get the command line arguments
const args = process.argv.slice(2);

// Check if there are enough arguments
if (args.length === 0) {
    console.log("Please provide an operation and numbers.");
    process.exit(1);
}

// Extract the operation and numbers
const operation = args[0];
const numbers = args.slice(1).map(Number);

// Function to generate a random number of specified length
const generateRandomNumber = (length) => {
    return crypto.randomBytes(length).toString('binary');
};

// Perform the calculation based on the operation
let result;
switch (operation) {
    case 'add':
        if (numbers.length < 2) {
            console.log("Please provide at least two numbers for addition.");
        } else {
            result = numbers.reduce((acc, num) => acc + num, 0);
            console.log(`Result: ${result}`);
        }
        break;

    case 'sub':
        if (numbers.length < 2) {
            console.log("Please provide at least two numbers for subtraction.");
        } else {
            result = numbers.reduce((acc, num) => acc - num);
            console.log(`Result: ${result}`);
        }
        break;

    case 'mult':
        if (numbers.length < 2) {
            console.log("Please provide at least two numbers for multiplication.");
        } else {
            result = numbers.reduce((acc, num) => acc * num, 1);
            console.log(`Result: ${result}`);
        }
        break;

    case 'divide':
        if (numbers.length < 2) {
            console.log("Please provide at least two numbers for division.");
        } else {
            result = numbers.reduce((acc, num) => acc / num);
            console.log(`Result: ${result}`);
        }
        break;

    case 'sin':
        if (numbers.length !== 1) {
            console.log("Please provide exactly one number for sine calculation.");
        } else {
            result = Math.sin(numbers[0]);
            console.log(`Result: ${result}`);
        }
        break;

    case 'cos':
        if (numbers.length !== 1) {
            console.log("Please provide exactly one number for cosine calculation.");
        } else {
            result = Math.cos(numbers[0]);
            console.log(`Result: ${result}`);
        }
        break;

    case 'tan':
        if (numbers.length !== 1) {
            console.log("Please provide exactly one number for tangent calculation.");
        } else {
            result = Math.tan(numbers[0]);
            console.log(`Result: ${result}`);
        }
        break;

    case 'random':
        if (numbers.length !== 1) {
            console.log("Provide length for random number generation.");
        } else {
            result = generateRandomNumber(numbers[0]);
            console.log(`Random Number: ${result}`);
        }
        break;

    default:
        console.log("Invalid operation");
}
