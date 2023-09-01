const bcrypt = require('bcrypt')
const User = require('../models/User')

console.log('Entered LoginUser.js ....  ')

module.exports = async (req, res) =>{
    const { username, password} = req.body;
    console.log('LoginUser.js username :', username,'  and password:', password)

   const userFromDB = await User.findOne({username: username}, {username: 1, password: 1} )
    
    if (userFromDB){
            bcrypt.compare(password, userFromDB.password, (error,same) =>{
                
                if(same){ // passwords match, store userID in session
                    req.session.userId = userFromDB._id
                    res.redirect('/')
                }
                else{
                    // passwords did not match
                    console.log('Inside LoginUser.js ... password did not match')
                    res.redirect('/auth/login') 
                }
            })
    }
    else{ // no matching username 
        console.log('Inside LoginUser.js ... user name not found')
        res.redirect('/auth/login') 
    } 

}