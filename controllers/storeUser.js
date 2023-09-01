const User = require('../models/User.js')
const path = require('path')

module.exports = async (req, res) => {
    try{
        await User.create(req.body)
        res.redirect('/')
    } catch (error) {
        
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

        console.log('StoreUser controller, Errors : ', validationErrors)  // error messages while storing a new user
        req.flash('validationErrors', validationErrors)
        req.flash('data', req.body)
       
        return res.redirect('/auth/register')
        }      
}