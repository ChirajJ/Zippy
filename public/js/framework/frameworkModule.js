(function(){
    
    /*var framework = function(){
        
        return {
            transclude: true,
            scope: {},
            controller: 'frameworkCntrl',
            templateUrl: '/partials/framework/framework.html'
        };
    };*/
    
    var app = angular.module('myFramework', ['myMenu', 'dashboard']);
    
    //app.directive('myFramework', framework);
    
}());