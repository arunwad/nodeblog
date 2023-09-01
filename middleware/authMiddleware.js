const User = require('../models/User')
module.exports = async (req, resp, next)=> {    
    try{
        let user = await User.findById(req.session.userId)
        console.log('authmiddleware... user object :', user)
        if (!user){
            return resp.redirect('/') 
        }
        next()
    }catch(error){
        if (error){
            return resp.redirect('/') 
        }
        next()
    }
 
}