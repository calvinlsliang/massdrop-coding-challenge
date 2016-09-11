var db = require('../db');

module.exports.show = function(job_id, cb) {
  db.get().exists(job_id, function(err, exists) {
    if (exists) {
      db.get().get(job_id, function(err, html) {
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
  queue.add(url, function(err, job_id) {
    cb(null, job_id);
  });
}
