const express = require('express')
const app = express()
const port = 3000
const path =require('path')
const mongoose=require('mongoose')
var flash = require('connect-flash');
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb+srv://admin:admin@cluster0.sgh8mpl.mongodb.net/sarahaApp',
    collection: 'mySessions'
  });
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
mongoose.set('strictQuery', false);
app.use(flash());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/messages.routes'))
app.use(require('./routes/user.routes'))

app.get('/logout', (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })

})


mongoose.connect('mongodb+srv://admin:admin@cluster0.sgh8mpl.mongodb.net/sarahaApp', // // your connection string
  { useNewUrlParser: true, useUnifiedTopology: true },)

  .then(()=>console.log("Connected Successfully"))
  .catch((err)=>{ console.log(err); }) ;
app.listen(port, () => console.log(`Example app listening at http://localhost:3000`)) 