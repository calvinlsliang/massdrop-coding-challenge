var db = require('../../../db/db');

var JOB_ID = "job_id";

module.exports = function(cb) {
  db.get().incr(JOB_ID, function() {
    db.get().get(JOB_ID, function(err, reply) {
      cb(reply);
    });
  });
}
