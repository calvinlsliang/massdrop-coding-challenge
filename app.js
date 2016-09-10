var express = require('express');
var bodyParser = require('body-parser');
var jobController = require('./app/controllers/job');

var app = express();
var db = require('./app/db/db')
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false})); // figure out why false
app.use(bodyParser.json());

app.get('/job/status/:job_id', jobController.show);
app.post('/job', jobController.create);

db.connect();
app.listen(port, function() {
  console.log("App listening on port %s.", port);
});
