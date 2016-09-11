var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('./db')
var jobQueue = require('./db/job_queue');
var config = require('./config');
var jobController = require('./controllers/job');

var port = config.port || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/job/:job_id', jobController.show);
app.post('/job', jobController.create);

db.connect(config);
jobQueue.connect(config);

app.listen(port, function() {
  console.log("App listening on port %s.", port);
});
