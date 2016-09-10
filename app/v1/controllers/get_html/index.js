var request = require('request');

module.exports = function(url, cb) {
  request(url, function(error, response, body) {
    cb({error, response, body});
  });
}
