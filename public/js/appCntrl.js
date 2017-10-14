(function(){
    
    var appCntrl = function($scope){
        
        $scope.app = 'App';
        
    };
    
    var app = angular.module('app');
    
    app.controller('appCntrl', ['$scope', appCntrl]);
    
}());