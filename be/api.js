const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database.js');

// logger
const morgan = require('morgan');

// za app
const app = express();
const Router = express.Router();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define routes here

// get all posts
Router.get('/', function(req, res) {
    res.json(db.getBlogPosts());
});

// get specific post by id
Router.get('/post/:postId', function(req, res) {
  var postId = req.params.postId;
  res.json(db.getBlogPost(postId));
});

// delete specific post by id
Router.delete('/delete/:postId', function(req, res) {
  var postId = req.params.postId;
  res.json(db.deleteBlogPost(postId));
});

// let the app use the routes
app.use('/api', Router);
app.listen(8090);

console.log('everything should be ok if u see this');
