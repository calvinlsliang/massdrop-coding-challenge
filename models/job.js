var db = require('../db');

module.exports.show = function(job_id, cb) {
  // checks existence of key in redis, if it doesn't exist then return
  // the job hasn't been created
  db.get().exists(job_id, function(err, exists) {
    if (err) {
      cb(err);
    }

    if (exists) {
      db.get().get(job_id, function(error, htmlResponse) {
        if (error) {
          cb(error);
        }

        var htmlJson = JSON.parse(htmlResponse);

        cb(null, {status: htmlJson.status, html: htmlJson.html})
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
