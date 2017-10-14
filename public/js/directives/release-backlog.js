(function(){
    
    var releaseBacklog = function(){
        
        return {
            scope: {
                test: '@'
            },
            templateUrl: '/partials/views/releaseBacklog.html',
            controller: 'releaseBacklogCntrl'
        };
    };
    
    angular.module('app').directive('myReleaseBacklog', [releaseBacklog]);
    
}());