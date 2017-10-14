var db = require('./model/db.js');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var Redis = require('connect-redis')(session);
var basic = require('./routes/basic.js');
var rbacklog = require('./routes/release-backlog-route.js');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: "Let it be a secret!",
  resave: true,
  saveUninitialized: true
 })
);

/* Basic routing */

app.get('/', basic.root);

app.get('/login', basic.login);

app.post('/authenticate', basic.authenticate);

app.get('/home', basic.home);

app.get('/signup', basic.signup);

app.post('/newUser', basic.newUser);

app.get('/logout', basic.logout);

/* User Story routing */

app.post('/userStory/create', basic.userStory.create);

app.get('/userStory/get', basic.userStory.getAll);

app.get('/userStory/get/:title', basic.userStory.getByTitle);

app.get('/userStory/status/:no', basic.userStory.getStatByRel);

app.post('/userStory/update', basic.userStory.update);

app.post('/userStory/delete', basic.userStory.delete);

app.post('/userStory/release', basic.userStory.updateRelease);

app.get('/userStory/release/:no', basic.userStory.getRelease);

app.post('/userStory/sprint', basic.userStory.updateSprint);

app.get('/userStory/sprint', basic.userStory.getSprintData);

app.get('/userStory/sprint/:no', basic.userStory.getSprint);

app.get('/userStory/sprintDet/:no', basic.userStory.getSprintDet);

/* Release Backlog routing */

app.post('/rbacklog', rbacklog.rbacklog.create);

app.get('/rbacklog', rbacklog.rbacklog.getAll);

/* Start Server */

var port = process.env.PORT || 3000;
var server = app.listen(port, function(req, res){

 console.log('Server Started at port: '+port);

});
