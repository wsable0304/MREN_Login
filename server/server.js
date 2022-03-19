const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const express = require('express');
const app = express();



dotenv.config({path:'./config.env'})

// database connection
require('./db/conn');

// link router
app.use(require('./router/auth'));

app.use(express.json());


const PORT = process.env.PORT;

// Middelware 
const middleware = (req,res, next) => {
    console.log(` Middleware`);
    next();
}


app.listen(PORT, ()=>{
    console.log(`server running at port no ${PORT}`)
})