var crypto = require('crypto');
var db = require('../db');
var jobQueue = require('../db/job_queue');

var JOB_ID = 'job_id';

// grabs the latest job_id and increments it. hashes it with md5sum
// so evil people will have a harder time figuring out other people's
// requests. would be nice to have a secret key to offset the hash
// but that is outside of the exercise.
getNextJobId = function(cb) {
  db.get().incr(JOB_ID, function() {
    db.get().get(JOB_ID, function(err, job_id) {
      if (err) {
        cb(err);
      }

      cb(null, crypto.createHash('md5').update(job_id).digest('hex'));
    });
  });
}

module.exports.add = function(url, cb) {
  getNextJobId(function(err, job_id) {
    if (err) {
      cb(err);
    }

    // adds the job_id and url to the job queue so it can be
    // handled accordingly and creates job in db with status "in progress"
    jobQueue.add(job_id, url);

    cb(null, job_id);
  });
}
