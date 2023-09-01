const express = require('express')
const app = new express()

const ejs = require('ejs')

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const mongoose = require('mongoose')
const { error } = require('console')
// mongoose.connect('mongodb://127.0.0.1/my_database', {useNewUrlParser: true}) //use the url 127.0.0.1 in place of localhost
mongoose.connect(
    'mongodb+srv://arunblogger:blogProject1@cluster0.4xbplzy.mongodb.net/my_database'
     )
/*mongoose.connect(
    'mongodb+srv://arunBlogger:blogProject1@cluster0.4xbplzy.mongodb.net/my_database', 
    { serverSelectionTimeoutMS: 5000},
     {useNewUrlParser: true}).catch(err => console.log('Mongo DB connect error', err.reason));
     // user Id was  misspelled arunBlogger in place of arunblogger and that caused me to trouble shoot 
*/
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
global.loggedIn = null
app.use("*", (req,res, next) => {
    loggedIn = req.session.userId
    next()
})
const homeController = require('./controllers/home.js')
const getPostController = require('./controllers/getPost.js')
const storePostController = require('./controllers/storePost.js')
const newPostController = require('./controllers/newPost.js')
const validateMiddleWare = require('./middleware/validationMiddleware.js')
const newUserController = require('./controllers/newUser.js')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const authMiddleware = require('./middleware/authMiddleware.js')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectAuthenticatedMiddleware.js')
const logoutController = require('./controllers/logout.js')
const flash = require('connect-flash')
app.use(flash())

app.get ('/',homeController)
app.get ('/post/:id',getPostController)
app.post ('/posts/store',storePostController)
app.get ('/posts/new',authMiddleware,newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.use('/posts/store', authMiddleware, validateMiddleWare)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout', logoutController)
app.use((req,res) => res.render('notfound')) // needs to be the last route

/*
app.listen(4000, () =>{
    console.log('App listening on port 4000')
}) 
*/ 
let port = process.env.port 
if (port == null || port == ""){
    port = 4000
}
app.listen(port, ()=>{
    console.log('App listening ...')
})