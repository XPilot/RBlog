var uuid = require('uuid');
//var jsonDB = require('json-file-db')('./db/blog.json.db'); // not good for our app...
var lowDB = require('lowdb');
var storage = require('lowdb/file-sync');
var db = lowDB('./db/blog.json.db', { storage });

// entry some dumb data for our first iteration
// if data already exists then don't insert it

if(Object.keys(db.object).length === 0) {
  console.log('Creating mock database');
  createMockedData();
}

function createMockedData() {
  db('posts').push(
    {
      id: uuid.v1(),
      title: 'Our first post',
      lead: 'This is a very cool lead',
      body: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>',
    },
    {
      id: uuid.v1(),
      title: 'Our second post',
      lead: 'Some mock data here',
      body: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>',
    },
    {
      id: uuid.v1(),
      title: 'Our third post',
      lead: '',
      body: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>',
    },
    {
      id: uuid.v1(),
      title: 'Our 4th post',
      lead: 'Some mock data here',
      body: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>',
    },
    {
      id: uuid.v1(),
      title: 'Our 5th post',
      lead: 'Some mock data here',
      body: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>',
    }
  );
}

// get all blog posts
exports.getBlogPosts = function() {
  return db('posts').value();
}

exports.addBlogPost = function(post) {
  var newPost = post;
  newPost.id = uuid.v1();
  db('posts').push(newPost);

  // we can also return the same parameter
  // as we got in the function but we'll
  // return a db entry instead

  var query = db('posts')
          .chain()
          .where({'id': newPost.id})
          .take(1)
          .value();

  if (!query.length) {
    return null;
  }

  return query[0];
}

// get a single blog post
exports.getBlogPost = function(postId) {
  var query = db('posts')
              .chain()
              .where({'id': postId})
              .take(1)
              .value();
  if (!query.length) {
    return null;
  }

  return query[0];
}

exports.updateBlogPost = function(post) {
  var query = db('posts')
                .chain()
                .find({id: post.id})
                .assign({
                  title: post.title,
                  lead: post.lead,
                  body: post.body,
                })
                .value();

  return query;
}

exports.deleteBlogPost = function(postId) {
  var query = db('posts')
                .remove({id: postId})
  return db('posts');
}
