require('dotenv').config()
//async errors

const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

console.log("04 API store");