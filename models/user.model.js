const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
name:String,
email:String,
password:String,
imgURL:String
//PasswordConfirmation:String
})
module.exports=mongoose.model('user', userSchema)