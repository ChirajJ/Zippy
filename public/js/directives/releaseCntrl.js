(function(){
    
    var releaseCntrl = function($scope, $http){
        
        $scope.boardFlag = false;
        $scope.releaseNo = '--select--';
        $scope.stories = [];
        
        $scope.loadBoard = function(){
            
            console.log('loading...');
            
            if($scope.releaseNo !== '--select--'){
                
                console.log('Table');
                
                $http.get('/userStory/status/' + $scope.releaseNo)
                          .then(function(resp){
                
                    console.log(resp);
                    //$scope.data = resp.data[0].title;
                    if(!resp.data.error){
                        
                        $scope.boardFlag = true;
                        
                        console.log('Response Release');
                        console.log(resp.data.stories); 
                        $scope.stories = resp.data.stories;
                    }
                });
            }
            else{
                $scope.boardFlag = false;
            }
            
        };
        
    };
    
    var app = angular.module('app');
    
    
    app.controller('releaseCntrl', ['$scope', '$http', releaseCntrl]);
    
}());