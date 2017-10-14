(function(){
    
    angular.module('app').directive('myReport', [function(){
        return {
            scope: {
                
            },
            templateUrl: '/partials/views/report.html',
            controller: 'reportCntrl'
        };
    }]);
    
}());