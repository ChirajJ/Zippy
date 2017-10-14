var db = require('../model/db.js');
var User = db.User;
var Backlog = db.Backlog;
var ReleaseBacklog = db.ReleaseBacklog;
var Sprint = db.Sprint;

exports.root = function(req, res){
    
     if(req.session.loginStatus === true){
         
         res.redirect('/home');
     }
     else{
         
         res.render('index', {});
     }
};

exports.login = function(req,res){
    
    if(req.session.loginStatus === true){
         
         res.redirect('/home');
    }
    else{
        res.render('login', {

            successMessage: req.session.successMessage,
            errorMessage: req.session.errorMessage
        });
    }
};

exports.authenticate = function(req, res){
    
    var email = req.body.email;
    var pswd = req.body.password;
    console.log("Email: "+email);
    User.findOne({email: email}, function(err, user){
        
        console.log("Type of user "+typeof user);
        console.log("User Error: "+err);
        console.log(user);
        
        if(user === null || err){
            console.log("User null/Error");
            console.log(err);
            console.log(user);
            res.redirect('/');}
        else{
            console.log("Check Pswd");
            user.cmpPswd(pswd, function(err, bool){
                
                console.log("Confirm Pswd Error: "+err);
                console.log("Confirm Pswd Status: "+bool);
                if(bool){
                    req.session.username = user.name;
                    req.session.loginStatus = true;
                    res.redirect('/home');
                }
                else{
                    res.redirect('/');
                }
            });
        }
     });
};

exports.home = function(req, res){
 
    if(req.session.loginStatus === true){
        
        res.render('home', {session: req.session});
    }
    else{
        res.redirect('/');
    }

};

exports.signup = function(req, res){
    
    if(req.session.loginStatus === true){
        
        res.redirect('/home');
    }
    else{
        
        res.render('signup', {
            
            successMessage: req.session.successMessage,
            errorMessage: req.session.errorMessage
        });
     }
};

var updateToOpen = function(dorQuery ,req, res){
    
    console.log('OPEN or Query');
    console.log(dorQuery);
    
    Backlog.update({
        $or: dorQuery
    }, {
        $set: { release: 'open' }
    }, { 
        multi: true 
    }, function(err, dstory){
        
        if(err){
            console.log('Derr');
            console.log(err);
            res.json('if error');
        }
        else{
            console.log('Result DGet');
            console.log(dorQuery);
            console.log(dstory);
            res.json('If else');
        }
            
    });
};

var updateSprint = function(dorQuery ,req, res, data){
    
    console.log('OPEN or Query Sprint');
    console.log(dorQuery);
    
    Backlog.update({
        $or: dorQuery
    }, {
        $set: { sprint: data.sno }
    }, { 
        multi: true 
    }, function(err, dstory){
        
        if(err){
            console.log('Derr');
            console.log(err);
            res.json('if error');
        }
        else{
            console.log('Result DGet');
            console.log(dorQuery);
            console.log(dstory);
            res.json('If else');
        }
            
    });
};

exports.newUser = function(req, res){
    
    var username = req.body.username;
    var email = req.body.email;
    var pswd = req.body.password;
    var pattern = new RegExp('\\s', 'g');
    if(pattern.test(username) || pattern.test(email) || pattern.test(pswd)){
        res.render('signup', {errorMessage: 'Fields are empty'});
    }
    else{
        console.log('newUser');
        console.log(username);
        var user = new User({
            
            _id: username,
            name: username,
            password: pswd,
            email: email
        });
        user.save(function(err){
            if(err){
                console.log('Error while saving');
                console.log(err);
                console.log(typeof err);
                if(err.code == 11000){
                    req.session.errorMessage = 'Username/Email ID already exists';
                }
                else{
                    req.session.errorMessage = err.toString();
                }
                res.redirect('signup');
            }
            else{
                console.log('User details Saved successfully');
                req.session.successMessage = 'Signed Up successfully';
                res.redirect('login');
            }
        });
    }
}

exports.logout = function(req, res){
    
    req.session.destroy();
    res.redirect('/');
};

exports.userStory = {
    
    create: function(req, res){
        
        console.log('Create User Story');
        
        var result = 'error';
        
        var story = Backlog({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            points: req.body.points
        });
        
        story.save(function(err){
            
            if(err){
                
                console.log('err');
                console.log(err);
                res.send(result);
            }
            else{
                
                result = 'success';
                console.log('Story details Saved successfully');
                console.log('Result: '+result);
                res.send(result);
            }
            
        });
        
    },
    
    getStatByRel: function(req, res){
        
        Backlog.find({release: req.params.no})
            .select({'title': 1, 'status': 1})
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
        
    },
    
    getAll: function(req, res){
        
        Backlog.find({release: 'open', sprint: -1})
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
        
        
    },
    
    getByTitle: function(req, res){
        
        Backlog.find({'title': req.params.title})
            .exec(function(err, story){
            if(err){
                
                console.log('err');
                console.log(err);
                res.json({
                    'error': true,
                    'story': {}
                });
                
            }
            
            else{
                console.log('Result');
                console.log(story);
                res.json({
                    'error': false,
                    'story': story
                });
            }
        });
        
    },
    
    update: function(req, res){
        
        Backlog.findOneAndUpdate({'title': req.body.title}, {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            points: req.body.points
        })
            .exec(function(err, story){
            if(err){
                
                console.log('err');
                console.log(err);
                res.json({
                    'error': true
                });
                
            }
            
            else{
                console.log('Result');
                console.log(story);
                res.json({
                    'error': false
                });
            }
        });
        
    },
    
    delete: function(req, res){
        
        Backlog.findOneAndRemove({'title': req.body.title})
            .exec(function(err, story){
            if(err){
                
                console.log('err');
                console.log(err);
                res.json({
                    'error': true
                });
                
            }
            
            else{
                console.log('Result');
                console.log(story);
                res.json({
                    'error': false
                });
            }
        });
        
    },
    
    updateRelease: function(req, res){
        
        console.log('********');
        console.log(req.body);
        console.log(req.body.data.dstories.stories);
        console.log('********');
        var data = req.body.data;
        var ustory = data.stories.stories;
        var dstory = data.dstories.stories;
        var orQuery = new Array();
        var dorQuery = new Array();
        
        if(typeof ustory !== 'object'){
            orQuery.push({'title': ustory});
        }
        else{
            for(var i in ustory){
                orQuery.push({'title': ustory[i]});
            }
        }
        
        if(typeof dstory !== 'object'){
            dorQuery.push({'title': dstory});
        }
        else{
            for(var i in dstory){
                dorQuery.push({'title': dstory[i]});
            }
        }
        
        if(data.stories.len > 0){
            
            Backlog.update({
                $or: orQuery
            }, {
                $set: { release: data.sno }
            }, { 
                multi: true 
            }, function(err, story){
                
                if(err){

                    console.log('err');
                    console.log(err);

                }
                else{
                    console.log('Result Get');
                    console.log(ustory);
                    console.log(orQuery);
                    console.log(data.sno);
                    console.log(story);
                    
                    if(data.dstories.len > 0){
                        updateToOpen(dorQuery, req, res);
                    }
                    else{
                        res.json('else');
                    }
                }
                
            });
            
        }
        
        else if(data.dstories.len > 0){
            updateToOpen(dorQuery, req, res);
        }       
        
    },
    
    getRelease: function(req, res){
        
        Backlog.find({release: req.params.no, sprint: -1})
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
                console.log('Result Release '+req.params.no);
                console.log(stories);
                res.json({
                    'error': false,
                    'stories': stories
                });
            }
        }); 
        
    },
    
    getSprint: function(req, res){
        
        Backlog.find({sprint: parseInt(req.params.no)})
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
                console.log('Result Sprint '+req.params.no);
                console.log(stories);
                res.json({
                    'error': false,
                    'stories': stories
                });
            }
        }); 
        
    },
    
    getSprintDet: function(req, res){
        
        Sprint.findOne({number: parseInt(req.params.no)})
            .select({
            
            'hCommited': 1, 
            'days': 1, 
            'points': 1, 
            'dPoints': 1, 
            'release': 1,
            'duration': 1, 
        })
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
                console.log('Result Sprint '+req.params.no);
                console.log(stories);
                res.json({
                    'error': false,
                    'stories': stories
                });
            }
        }); 
        
    },
    
    getSprintData: function(req, res){
        
        Sprint.find({})
            .select({
            
            'number': 1,
            'hCommited': 1, 
            'days': 1, 
            'points': 1, 
            'dpoints': 1, 
            'release': 1,
            'duration': 1, 
        })
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
                console.log('Result Sprint All'+req.params.no);
                console.log(stories);
                res.json({
                    'error': false,
                    'stories': stories
                });
            }
        }); 
        
    },
    
    updateSprint: function(req, res){
        
        console.log('********');
        console.log(req.body);
        console.log(req.body.data.dstories.stories);
        console.log('********');
        var data = req.body.data;
        var ustory = data.stories.stories;
        var dstory = data.dstories.stories;
        var orQuery = new Array();
        var dorQuery = new Array();
        
        if(typeof ustory !== 'object'){
            orQuery.push({'title': ustory});
        }
        else{
            for(var i in ustory){
                orQuery.push({'title': ustory[i]});
            }
        }
        
        if(typeof dstory !== 'object'){
            dorQuery.push({'title': dstory});
        }
        else{
            for(var i in dstory){
                dorQuery.push({'title': dstory[i]});
            }
        }
        
        if(data.stories.len > 0){
            
            Backlog.update({
                $or: orQuery
            }, {
                $set: { sprint: -1 }
            }, { 
                multi: true 
            }, function(err, story){
                
                if(err){

                    console.log('err');
                    console.log(err);

                }
                else{
                    console.log('Result Get');
                    console.log(ustory);
                    console.log(orQuery);
                    console.log(data.sno);
                    console.log(story);
                    
                    if(data.dstories.len > 0){
                        updateSprint(dorQuery, req, res, data);
                    }
                    else{
                        res.json('else');
                    }
                }
                
            });
            
        }
        
        else if(data.dstories.len > 0){
            updateSprint(dorQuery, req, res, data);
        }       
        
    }
    
};