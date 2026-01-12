require('dotenv').config()
//async errors

const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// express middleware

app.use(express.json);

//routes

app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products"> Products route</a>')
})