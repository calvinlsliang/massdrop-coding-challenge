var queue = require('../queue');
var db = require('../../../db/db');

getJob = function(req, res) {
  var job_id = req.params.job_id;
  var db_instance = db.get();
  db_instance.exists(job_id, function(err, exists) {
    if (exists) {
      db_instance.get(job_id, function(err, html) {
        if (typeof(html) != 'undefined' && html != null) {
          res.send({job_id, status: "completed", html});
        } else {
          res.send({job_id, status: "in queue"});
        }
      });
    } else {
      res.send({job_id, status: "not created"});
    }
  });
}

createJob = function(req, res) {
  queue.add(req.body.url, function(job_id) {
    res.send({job_id});
    res.status(201).end();
  });
}

module.exports = {
  show: getJob,
  create: createJob
}
