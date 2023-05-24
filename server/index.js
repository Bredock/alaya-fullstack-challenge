require('dotenv').config();
const db = require('./db');
const server = require('./server');
const apiPort = 3000;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
