var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var sprintSchema = new Schema({
         
    number: {
        type: Number,
        unique: true
    },
    release: String,
    points: Number,
    dPoints: Number,
    hCommited: Number,
    duration: Number,
    start_date: Date,
    end_date: Date,
    days: Array
});

var Sprint = mongoose.model('sprint', sprintSchema, 'sprint');

module.exports = {
    Sprint: Sprint
};

/*
{
    "number" : 0,
    "release" : "R1.0",
    "start_date" : ISODate("2017-07-24T18:24:18.308Z"),
    "end_date" : ISODate("2017-08-04T18:24:18.308Z"),
    "hCommited" : 30,
    "days" : [[14,6], [12,12], [8, 18], [6, 24], [0, 30]],
    "duration" : 5,
    "status" : 1,
    "points" : 14,
    "dpoints" : 7
}
*/