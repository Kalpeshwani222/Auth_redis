const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

const connectDB = require("./helpers/db");
const authRoute = require("./routes/auth.route");
const {VerifyAccessToken} = require('./helpers/jwt_helper');
const client = require('./helpers/init_redis');

client.SET('foo', 'bar');
client.GET('foo',(err,value) =>{
    if(err) console.log(err.message);
    console.log(value);
})

const app = express();
app.use(express.json());
app.use(morgan('dev'));


connectDB();
app.get('/', VerifyAccessToken, async(req,res,next) =>{
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

