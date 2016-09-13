var bullQueue = require('bull');
var request = require('request');
var db = require('./index');
var Response = require('../models/response');

var jobQueue = null;
var STATUS_COMPLETE = "completed";
var STATUS_IN_PROGRESS = "in progress";
var STATUS_ERROR = "error"

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
      var job_id = job.data.job_id;
      var htmlResponse;

      if (!err && html.response.statusCode == 200) {
        htmlResponse = Response.create(STATUS_COMPLETE, html.response.body);
      } else {
        htmlResponse = Response.create(STATUS_ERROR, err.toString());
      }
      db.get().set(job_id, JSON.stringify(htmlResponse));

      done();
    });
  });
}

module.exports.add = function(job_id, url) {

  // adds job to job queue
  jobQueue.add({job_id, url});

  // adds "in progress" record to db
  htmlResponse = Response.create(STATUS_IN_PROGRESS, null);
  db.get().set(job_id, JSON.stringify(htmlResponse));
}
