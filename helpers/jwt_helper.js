const JWT = require('jsonwebtoken');
const createError = require("http-errors");

module.exports = {
    
    signAccessToken : (userId) =>{
        return new Promise((resolve,reject) =>{
            
            const payload = {
                
            }
            const secret = "super secret"
            
            const options = {
                expiresIn: "1h",
                issuer : "kalpeshwani.com",
                audience : userId, 
            }

            JWT.sign(payload, secret, options,(err,token)=>{
                if(err){
                    reject(err)
                }
                resolve(token)
            })
        })
    }
}