const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();

//body-parser middleware
app.use(express.json());

//route middleware
app.use('/api/user',authRoute);

app.listen(process.env.PORT || 4000, () =>{
    console.log('App running on port 4000');
});

mongoose.connect(process.env.DB_URI, () =>{
    console.log('Connected to DB')
})
