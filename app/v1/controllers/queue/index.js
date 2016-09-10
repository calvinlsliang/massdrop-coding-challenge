var bullQueue = require('bull');
var getHtml = require('../get_html');
var getNextJobId = require('../job/job_id');
var db = require('../../../db/db');

var jobQueue = bullQueue('job', 6379, '127.0.0.1');

jobQueue.process(function(job, done) {
  getHtml(job.data.url, function(htmlObject) {
    if (!htmlObject.error && htmlObject.response.statusCode == 200) {
      db.get().set(job.data.job_id, htmlObject.response.body);
    } else {
      db.get().set(job.data.job_id, htmlObject.error.toString());
    }
    done();
  });
});

module.exports.add = function(url, cb) {
  getNextJobId(function(job_id) {
    jobQueue.add({job_id, url});
    cb(job_id);
  });
}
