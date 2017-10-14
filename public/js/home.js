(function(){
    
    var app = angular.module('myApp', []);
    
    var greetCntrl = function($scope, $http) {
        $scope.greet = "Regards!";
    };
    
    app.controller('userCtrl', ['$scope', '$http', greetCntrl]);
    
}());
