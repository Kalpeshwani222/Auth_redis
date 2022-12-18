const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema({
    email :{
        type:String,
        required: true,
        lowercase:true,
        unique : true
    },

    password: {
        type:String,
        required: true,
    }
})


userSchema.pre('save',async function (next){
    try {
        // console.log("call before saving a user");
        const salt = await bcrypt.genSalt(10);
        // console.log(this.email,this.password);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
        next()
    } catch (error) {
        next(error)
    }
})


// userSchema.post('save',async function (next){
//     try {
//         console.log("call after saving a user");
//     } catch (error) {
//         next(error)
//     }
// })


userSchema.methods.isValidPassword = async function(password){
    try {
       return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('user',userSchema);
module.exports = User;