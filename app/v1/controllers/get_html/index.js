var request = require('request');

module.exports = function(url, cb) {
  request(url, function(err, response, body) {
    cb({err, response, body});
  });
}
