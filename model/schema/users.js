var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    
    _id: {
        type: String,
        unique: true
    },     
    name: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    }
});

userSchema.methods.cmpPswd = function(pswd, cb){
 console.log('db.js '+pswd+'////'+this.email);
 if(pswd === this.password){
  cb(null, true);
 }
 else{
  cb(null, false);
 }
};

var User = mongoose.model('user', userSchema, 'user');

module.exports = User;