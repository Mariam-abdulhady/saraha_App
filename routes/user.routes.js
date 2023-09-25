const app =require('express').Router()
const messageModel =require('../models/message.model')
//global variable
let userID


app.get('/user/:id', (req, res) =>{
    userID=req.params.id
   // console.log(req.params.id);
    let fullPath=req.protocol+"://"+req.headers.host+"/user/"+req.session.userID
    res.render('user.ejs',{name:req.session.name,fullPath,isloggedin:req.session.isloggedin})
})

app.post('/handelUser',async(req,res)=>{
    //console.log(req.body);
    const{message}=req.body
    await messageModel.insertMany({message,userID})
    res.redirect('/user/'+userID)
})
module.exports =app