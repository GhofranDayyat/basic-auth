require('dotenv').config();
const MONGODB_URL= process.env.MONGODB_URL;
const PORT = process.env.PORT;
const server = require('./src/server.js');
server.start(PORT,MONGODB_URL);
