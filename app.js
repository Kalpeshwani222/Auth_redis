const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
const authRoute = require("./routes/auth.route");
 
const app = express();


app.get('/',async(req,res,next) =>{
    res.send("Hello")
})

app.use('/auth',authRoute);


app.use(async(req,res,next) =>{
    // const error = new Error("Not found");
    // error.status = 404;
    // next(error);
    next(createError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error :{
            status: err.status || 500,
            message: err.message,
        }
    })
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});

