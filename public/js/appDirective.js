(function(){
    
    var menu = function(){
        
        return{
            scope: {
                uname: '@'
            }
        };
        
    };
    
    var app = angular.module('app');
    
    app.directive('appDir', menu);
    
}());