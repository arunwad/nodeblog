module.exports = (req, res)=>{
    var username = ""
    var password =""
    const data = req.flash('data')[0]

    if(typeof data != 'undefined'){
        username = data.username
        password = data.password
    }
    console.log('newUser Controller session: ', req.session)
    console.log('newUser Controller flash: ', req.flash.validationErrors)

    
    res.render('register',{
        errors: req.flash('validationErrors'),
        username: username, 
        password: password}) 
    
}