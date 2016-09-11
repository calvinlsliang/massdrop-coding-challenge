var crypto = require('crypto');
var db = require('../db');
var jobQueue = require('../db/job_queue');

var JOB_ID = 'job_id';
var md5sum = crypto.createHash('md5');

module.exports.add = function(url, cb) {
  getNextJobId(function(err, job_id) {
    jobQueue.get().add({job_id, url});
    cb(null, job_id);
  });
}

getNextJobId = function(cb) {
  db.get().incr(JOB_ID, function() {
    db.get().get(JOB_ID, function(err, job_id) {
      cb(null, md5sum.update(job_id).digest('hex'));
    });
  });
}
