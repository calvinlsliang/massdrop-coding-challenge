var bullQueue = require('bull');
var request = require('request');
var db = require('./index');

var jobQueue = null;

// job_queue lives in the db folder since the Job Queue library (bull)
// uses redis heavily for its persistence and queue management.

// retrieves the html contents using the request library
getHtml = function(url, cb) {
  request(url, function(err, response, body) {
    cb(err, {response, body});
  });
}

module.exports.connect = function(config) {
  // jobQueue is only initialized once 
  jobQueue = bullQueue('job', config.redis.port, config.redis.host);

  // process() is called every time an added job gets popped off
  // and acted on
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
