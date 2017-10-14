var db = require('../model/db.js');

var ReleaseBacklog = db.ReleaseBacklog;

exports.rbacklog = {
    
    create: function(req, res){
        
        res.send();
        
    },
    
    getAll: function(req, res){
        
        ReleaseBacklog.find({})
            .select({'title': 1, 'priority': 1})
            .exec(function(err, stories){
            if(err){
                
                console.log('err');
                console.log(err);
                res.json({
                    'error': true,
                    'stories': {}
                });
                
            }
            
            else{
                console.log('Result');
                console.log(stories);
                res.json({
                    'error': false,
                    'stories': stories
                });
            }
        });
        
    }
};