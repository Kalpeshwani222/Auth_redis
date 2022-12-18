const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const User = require("../models/user.model");
const {authSchema} = require("../helpers/validate_schema");


router.post('/register',async(req,res,next)=>{
   try {
    //    const { email, password } = req.body;
        // if(!email || !password){
        //     throw createError.BadRequest();
        // }
        const result = await authSchema.validateAsync(req.body);
        
        const alreadyExist = await User.findOne({email: result.email});
        if(alreadyExist){
            throw createError.Conflict(`${result.email} is already exists`)
        }

        const user = new User(result);
        const saveUser = await user.save();

        res.send(saveUser);
   } catch (error) {
       if(error.isJoi === true){
           error.status = 422
       }
       next(error)
   } 
})



router.post('/login',async(req,res,next)=>{
    res.send("login route");
})


router.post('/refresh-token',async(req,res,next)=>{
    res.send("refresh token route");
})


router.delete('/logout',async(req,res,next)=>{
    res.send("logout route");
})



module.exports = router;