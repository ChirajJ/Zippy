(function(){
    
    angular.module('app').directive('mySprint', [function(){
        return {
            scope: {
                
            },
            templateUrl: '/partials/views/sprint.html',
            controller: 'sprintCntrl'
        };
    }]);
    
}());