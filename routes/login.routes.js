const app =require('express').Router()
const usermodel =require('../models/user.model')
const bcrypt = require('bcrypt');
app.get('/login', (req, res) =>{
    
    res.render('login.ejs',{isloggedin:req.session.isloggedin})
})
app.post('/handleLogin',async(req,res)=>{
    const{email,password}=req.body
   let user =await usermodel.findOne({email})
   if(user){
    const match = await bcrypt.compare(password, user.password);
    if(match){
        req.session.userID=user._id
        req.session.name=user.name
        req.session.isloggedin=true
        res.redirect('/messages')
    }else{
        res.redirect('/login')   
    }
   }
   else{
    res.redirect('/login')
}
   })
   
module.exports =app