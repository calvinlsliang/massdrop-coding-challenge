var queue = require('../queue');
var db = require('../../../db/db');

module.exports.show = function(req, res) {
  var job_id = req.params.job_id;
  db.get().exists(job_id, function(err, exists) {
    if (exists) {
      db.get().get(req.params.job_id, function(err, html) {
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

module.exports.create = function(req, res) {
  queue.add(req.body.url, function(job_id) {
    res.send({job_id});
    res.status(201).end();
  });
}
