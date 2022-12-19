const JWT = require('jsonwebtoken');
const createError = require("http-errors");

module.exports = {
    
    signAccessToken : (userId) =>{
        return new Promise((resolve,reject) =>{
            
            const payload = {
                
            }
            const secret = process.env.ACCESS_TOKEN_SECRET;
            
            const options = {
                expiresIn: "15s",
                issuer : "kalpeshwani.com",
                audience : userId, 
            }

            JWT.sign(payload, secret, options,(err,token)=>{
                if(err){
                    console.log(err.message);

                    // reject(err)
                    reject(createError.InternalServerError());
                }
                resolve(token)
            })
        })
    },


    VerifyAccessToken : (req,res,next) =>{
        if(!req.headers['authorization']){
            return next(createError.Unauthorized());
        }

        const  authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload) =>{
            if(err){
                return next(createError.Unauthorized());
            }
            req.payload = payload;
            next();
        })
    }
}