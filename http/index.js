const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Read todos from db.json
const readTodos = () => {
  const data = fs.readFileSync(path.join(__dirname, 'db.json'));
  return JSON.parse(data).todos;
};

// Write todos to db.json
const writeTodos = (todos) => {
  const data = JSON.stringify({ todos }, null, 2);
  fs.writeFileSync(path.join(__dirname, 'db.json'), data);
};

// Get all todos
app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: req.body.title,
    status: false
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Update status of todos with even ID from false to true
app.patch('/todos/update-status', (req, res) => {
  let todos = readTodos();
  todos = todos.map(todo => {
    if (todo.id % 2 === 0 && !todo.status) {
      todo.status = true;
    }
    return todo;
  });
  writeTodos(todos);
  res.json(todos);
});

// Delete todos whose status is true
app.delete('/todos/delete-completed', (req, res) => {
  let todos = readTodos();
  todos = todos.filter(todo => !todo.status);
  writeTodos(todos);
  res.json(todos);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
