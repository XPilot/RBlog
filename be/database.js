var uuid = require('uuid');
var jsonDB = require('json-file-db')('./db/blog.json.db');

// brb
// grabbing grub :)

// entry some dumb data for our first iteration
// if data already exists then don't insert it
var totalRecords = 0;

jsonDB.get(function(err, data){
  totalRecords = data.length;

  console.log('we is here and has the length of: ', totalRecords);

  if (!totalRecords) createMockedData();
});

function createMockedData() {
  jsonDB.put(
    {
      id: uuid.v1(),
      title: 'Our first post',
      lead: 'This is a very cool lead',
      body: 'Kittens, kittens everywhere',
    }
  );
}

exports.getBlogPosts = function(cb) {
  return jsonDB.get(function(error, data){
    cb(data);
  });
}
