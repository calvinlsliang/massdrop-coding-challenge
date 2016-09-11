var db = require('../db');

module.exports.show = function(job_id, cb) {
  // checks existence of key in redis, if it doesn't exist then return
  // the job hasn't been created
  db.get().exists(job_id, function(err, exists) {
    if (err) {
      cb(err);
    }

    if (exists) {
      db.get().get(job_id, function(error, html) {
        if (error) {
          cb(error);
        }

        // if html is null then the job is still in queue
        if (typeof(html) != 'undefined' && html != null) {
          cb(null, {status: "completed", html});
        } else {
          cb(null, {status: "in queue", html});
        }
      });
    } else {
      cb(null, {status: "not created", html: null});
    }
  });
}

module.exports.create = function(queue, url, cb) {
  // add the POST request to the job queue so it can be
  // handled accordingly
  queue.add(url, function(err, job_id) {
    if (err) {
      console.log("Error with Job#create", err);
      cb(err);
    }

    cb(null, job_id);
  });
}
