const express = require('express');
const authRoute = require('./routes/auth');

const app = express();

app.use('/api/user',authRoute, () =>{

});

app.listen(process.env.PORT || 4000, () =>{
    console.log('App running on port 4000');
});