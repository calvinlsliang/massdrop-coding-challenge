var redis = require('redis');

var db = null;

function host(config) {
  return config.redis.host || "127.0.0.1";
}

function port(config) {
  return config.redis.port || 6379;
}

module.exports.connect = function(config) {
  db = redis.createClient({
    "host": host(config),
    "port": port(config)
  });

  db.on('connect', function() {
    console.log('Redis connected');
  });
}

module.exports.get = function() {
  return db;
}
