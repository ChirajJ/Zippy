(function(){
    
    var app = angular.module('myFramework');
    
    var frameCntrl = function($scope, $location){
        
        $scope.$on('menu-item-selected-event', function(evt, data){
            $scope.routeString = data.route;
            $location.path(data.route);
        });
    }
    
    app.controller('frameworkCntrl', ['$scope', '$location', frameCntrl]);
    
}());