var redis = require('redis');

var db = null;

module.exports.connect = function(mode) {
  db = redis.createClient(); // add port/host config

  db.on('connect', function() {
    console.log('Redis connected');
  });
}

module.exports.get = function() {
  return db;
}
