var bullQueue = require('bull');
var request = require('request');
var db = require('./index');

var jobQueue = null;

getHtml = function(url, cb) {
  request(url, function(err, response, body) {
    cb(err, {response, body});
  });
}

module.exports.connect = function(config) {
  jobQueue = bullQueue('job', config.redis.port, config.redis.host);

  jobQueue.process(function(job, done) {
    getHtml(job.data.url, function(err, html) {
      if (!err && html.response.statusCode == 200) {
        db.get().set(job.data.job_id, html.response.body);
      } else {
        db.get().set(job.data.job_id, err.toString());
      }
      done();
    });
  });
}

module.exports.get = function() {
  return jobQueue;
}
