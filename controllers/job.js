var Job = require('../models/job');
var Queue = require('../models/queue');

// GET /job/:job_id
module.exports.show = function(req, res) {
  var job_id = req.params.job_id;
  Job.show(job_id, function(err, response) {
    res.send({job_id, status: response.status, html: response.html});
  });
}

// POST /job
// Body: {url: "http://www.google.com"}
module.exports.create = function(req, res) {
  Job.create(Queue, req.body.url, function(err, job_id) {
    res.send({job_id});
    res.status(201).end();
  });
}
