var chalk = require('chalk');
var mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost/zippy';

mongoose.connection.once('open', function(){
        console.log(chalk.green('Connection with MongoDB is open '+dbUrl));
});

mongoose.connection.on('error', function(){
        console.log(chalk.red('Error in connection with MongoDB '+dbUrl));
});

mongoose.connection.on('disconnected', function(){
        console.log(chalk.orange('MongoDB disconnected '+dbUrl));
});

mongoose.connect(dbUrl);

console.log(chalk.green('*********Inside MongoDB********'));

console.log(chalk.green('Initiating User Model'));

exports.User = require('./schema/users.js');

console.log(chalk.green('Initiating Backlog Model'));

var stories = require('./schema/backlogStories.js');
exports.Backlog = stories.Backlog;
exports.ReleaseBacklog = stories.ReleaseBacklog;

console.log(chalk.green('Initiating Sprint Model'));

var sprints = require('./schema/sprint.js');
exports.Sprint = sprints.Sprint;

console.log(chalk.green('*********MongoDB Ready********'));