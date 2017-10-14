(function(){
    
    var app = angular.module('app');
    
    app.config(['$routeProvider', function($routeProvider){
        
        var routes = [
            {
                url: '/backlog',
                config: {
                    template: '<my-backlog></my-backlog>'
                }
            },
            {
                url: '/release-backlog',
                config: {
                    template: '<my-release-backlog></my-release-backlog>'
                }
            },
            {
                url: '/sprint',
                config: {
                    template: '<my-sprint></my-sprint>'
                }
            },
            {
                url: '/release',
                config: {
                    template: '<my-release></my-release>'
                }
            },
            {
                url: '/report',
                config: {
                    template: '<my-report></my-report>'
                }
            }
        ];
        
        routes.forEach(function(route) {
            $routeProvider.when(route.url, route.config);
        });
        
        //$routeProvider.otherwise({redirectTo: '/backlog'});
        
    }]);
    
}());