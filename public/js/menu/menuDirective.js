(function(){
    
    var linkFunc = function(scope, el, attr){
        
    };
    
    var menu = function(){
        
        return{
            transclude: true,
            templateUrl: '/partials/menu/menu.html',
            controller: 'menuCntrl',
            link: linkFunc
        };
        
    };
    
    var app = angular.module('myMenu');
    
    app.directive('myMenu', menu);
    
}());