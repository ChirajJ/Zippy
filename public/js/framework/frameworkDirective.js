(function(){
    
    var framework = function(){
        
        return {
            transclude: true,
            scope: {
                name: '@'
            },
            controller: 'frameworkCntrl',
            templateUrl: '/partials/framework/framework.html'
        };
    };
    
    var app = angular.module('myFramework');
    
    app.directive('myFramework', framework);
    
}());