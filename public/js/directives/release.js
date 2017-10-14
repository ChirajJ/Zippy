(function(){
    
    angular.module('app').directive('myRelease', [function(){
        return {
            scope: {
                
            },
            templateUrl: '/partials/views/release.html',
            controller: 'releaseCntrl'
        };
    }]);
    
}());