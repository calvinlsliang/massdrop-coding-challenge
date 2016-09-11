var redis = require('redis');

// keep the name generic so we can swap out redis for something
// else easily just by replacing connect()
var db = null;

module.exports.connect = function(config) {
  db = redis.createClient({
    "host": config.redis.host || "127.0.0.1",
    "port": config.redis.port || 6379
  });

  db.on('connect', function() {
    console.log('Redis connected');
  });
}

module.exports.get = function() {
  return db;
}
