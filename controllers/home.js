const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid')
    //console.log('Entered home.js controller and printing session info :', req.session)
    console.log('Session id  :', req.session)
    res.render('index', {
        blogposts
    });
}