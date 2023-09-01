const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://127.0.0.1:27017/my_database', {useNewUrlParser: true});
// error handling from https://hohanga.medium.com/using-mongodb-with-mongoose-connections-d1a4d3e734cf
const db = mongoose.connection;
db.on('error', () => console.error('connection error:'));
db.once('open', () => {
  console.log('connected')
});
BlogPost.create({
        title: 'The mythbster Guide to Saving Money on Energy Bills',
        body: 'If you have been  here a long time, you might rememeber when I wnt on ITV Tonight to despense a masterclass in saving money on energy bills.' +
         'Energy-saving is one of my favourite money topics, because once you get past  the boring bullet-point lists, a whole new world of thrifty nerdery opens'+
         'You know those bullet point lists. You start spotting them everthing athe this time of year. They go like this:'},
         )
  
