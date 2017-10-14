(function(){
    
    var linkFunc = function(scope, el, attr, ctrl){
        
    };
    
    var backlog = function(){
        
        return {
            scope: {
                test: '@'
            },
            templateUrl: '/partials/views/backlog.html',
            controller: 'backlogCntrl',
            link: linkFunc
        };
    };
    
    angular.module('app').directive('myBacklog', [backlog]);
    
}());
/*
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
*/