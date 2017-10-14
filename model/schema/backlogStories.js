var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var backlogSchema = new Schema({
         
    title: {
        type: String,
        unique: true
    },
    description: String,
    priority: {
        type: Number,
        min: 1,
        max: 3
    },
    release: String,
    sprint: Number,
    points: Number,
    status: {
        type: Number,
        min: 1,
        max: 3
    },
    task: Array,
    create_date: Date,
    update_date: Date
});

backlogSchema.pre('save', function(next) {
    
    console.log('Pre Save');
    
    var currentDate = new Date();
    this.update_date = currentDate;
    
    if(!this.create_date){
        this.create_date = currentDate;
    }
    if(!this.release){
        this.release = 'open';
    }
    if(!this.task){
        this.task = [];
    }
    if(!this.sprint){
        this.sprint = -1;
    }
    if(!this.points){
        this.points = 0;
    }
    if(!this.status){
        this.status = 1;
    }
    next();
    
});

backlogSchema.pre('findOneAndUpdate', function() {
    
    console.log('Pre Update');
    
    this.update({},{ $set: { update_date: new Date() } });
    
});

var Backlog = mongoose.model('backlog', backlogSchema, 'backlog');
var ReleaseBacklog = mongoose.model('releasebacklog', backlogSchema, 'release_backlog');

module.exports = {
    Backlog: Backlog,
    ReleaseBacklog: ReleaseBacklog
};