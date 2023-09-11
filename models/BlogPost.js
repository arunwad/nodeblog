const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true,'Please provide a unique title'],
        unique: true
    },
    body: {
        type: String,
        required: [true,'Please provide some content for this post'],
        unique: true
    },
    userid:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true 
    },
    datePosted: {/* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: [true,'Please add an image'],
        unique: true
    }
});
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost
