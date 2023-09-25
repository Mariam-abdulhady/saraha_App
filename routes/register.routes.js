const app =require('express').Router()
//first step to insert eny thing inside database
const usermodel =require('../models/user.model')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator')
const validation = require('../validation/register.validation')
app.get('/register', (req, res) => {
    let oldInputs = req.flash('oldInputs')[0]
    if (oldInputs == undefined) {
        oldInputs = { name: '', email: '', password: '', PasswordConfirmation: '' }
    }
    res.render('register.ejs', { errors: req.flash('errors'), isloggedin:req.session.isloggedin, oldInputs })
});
app.post('/handleRegister', validation,  async(req, res) => {
        const errors = validationResult(req)
        console.log(errors.array());
        console.log(errors.isEmpty());
        console.log(req.body);
        const { name, email, password } = req.body
        if (errors.isEmpty() == true) {
            bcrypt.hash(password, 8, async function(err, hash) {
                await usermodel.insertMany({ name, email, password: hash })
                res.redirect('/login')
            });
        } else {
            req.flash('errors', errors.array())
            req.flash('oldInputs', req.body)
            res.redirect('/register')
                //connect-flash
                // res.render('register.ejs', { errors, isLoggedIn: req.session.isLoggedIn })
        }
    });
module.exports =app