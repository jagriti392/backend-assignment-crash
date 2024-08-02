const fs = require('fs');
const path = require('path');

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  case 'read':
    readFile(file);
    break;
  case 'delete':
    deleteFile(file);
    break;
  case 'create':
    createFile(file);
    break;
  case 'append':
    appendToFile(file, content);
    break;
  case 'rename':
    renameFile(file, content);
    break;
  case 'list':
    listDirectory(file);
    break;
  default:
    console.log(`Invalid operation '${operation}'`);
}

function readFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file '${filename}':`, err.message);
      return;
    }
    console.log(data);
  });
}

function deleteFile(filename) {
  fs.unlink(filename, (err) => {
    if (err) {
      console.error(`Error deleting file '${filename}':`, err.message);
      return;
    }
    console.log(`File '${filename}' deleted`);
  });
}

function createFile(filename) {
  fs.writeFile(filename, '', (err) => {
    if (err) {
      console.error(`Error creating file '${filename}':`, err.message);
      return;
    }
    console.log(`File '${filename}' created`);
  });
}

function appendToFile(filename, newContent) {
  fs.appendFile(filename, newContent + '\n', (err) => {
    if (err) {
      console.error(`Error appending to file '${filename}':`, err.message);
      return;
    }
    console.log(`Content appended to the file '${filename}'`);
  });
}

function renameFile(oldFilename, newFilename) {
  fs.rename(oldFilename, newFilename, (err) => {
    if (err) {
      console.error(`Error renaming file '${oldFilename}' to '${newFilename}':`, err.message);
      return;
    }
    console.log(`File '${oldFilename}' renamed to '${newFilename}'`);
  });
}

function listDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error listing directory '${directory}':`, err.message);
      return;
    }
    files.forEach(file => console.log(file));
  });
}
