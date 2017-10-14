(function(){
    
    var app = angular.module('myMenu');
    
    app.controller('menuCntrl', ['$scope', '$rootScope', function($scope, $rootScope){
        
        this.setActiveItem = function(el){
            $scope.activeElement = el;
        };
        
        this.setRoute = function(route){
            $rootScope.$broadcast('menu-item-selected-event', 
                                 {route: route});
        };
        
        this.getActiveItem = function(){
            return $scope.activeElement;
        };
        
    }]);
}());