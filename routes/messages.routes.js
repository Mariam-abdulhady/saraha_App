const app =require('express').Router()
const messageModel=require('../models/message.model')
app.get('/messages', async(req, res) =>{
    //console.log(req.headers.host);
    //console.log(req.protocol);
    let messages=await messageModel.find({userID:req.session.userID})
 let fullPath=req.protocol+"://"+req.headers.host+"/user/"+req.session.userID
    if(req.session.isloggedin==true){
        res.render('messages.ejs',{name:req.session.name,fullPath,messages,isloggedin:req.session.isloggedin})
    }else{
        res.redirect('/login')   
    }
   
})
module.exports =app