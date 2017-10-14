(function(){
    
    var popUp = function($scope, $http, $window, $uibModalInstance, $rootScope){
        
        $scope.close = function () {
            
            $uibModalInstance.close();
        };
        
        $scope.create = function () {
            
            console.log($scope.optradio);
            
            $http.post('/userStory/create', {
                
                title: $scope.storyTitle,
                description: $scope.desc,
                priority: $scope.optradio,
                status: $scope.optradio1,
                points: $scope.storyPoints
                
            }).then(function(resp){
                
                console.log(resp);
                $uibModalInstance.close();
                //$window.location.reload();
                
                $rootScope.$broadcast('story-created-refresh');
            });            
            
        };
        
        $scope.update = function () {
            
            console.log($scope.optradio);
            console.log($scope.uDesc);
            console.log($scope.uStoryTitle);
            
            $http.post('/userStory/update', {
                
                title: $scope.uStoryTitle,
                description: $scope.uDesc,
                priority: $scope.uOptradio,
                status: $scope.uOptradio1,
                points: $scope.uStoryPoints
                
            }).then(function(resp){
                
                console.log(resp);
                $uibModalInstance.close();
                //$window.location.reload();
                
                $rootScope.$broadcast('story-created-refresh');
            });            
            
        };
        
        $scope.delete = function () {
            
            console.log($scope.optradio);
            console.log($scope.uDesc);
            console.log($scope.uStoryTitle);
            
            $http.post('/userStory/delete', {
                
                title: $scope.uStoryTitle
                
            }).then(function(resp){
                
                console.log(resp);
                $uibModalInstance.close();
                //$window.location.reload();
                
                $rootScope.$broadcast('story-created-refresh');
            });            
            
        };
        
    };
    
    var backlogCntrl = function($scope, $http, $window, $uibModal, $rootScope){
        
        $scope.app = 'Apps';
        $scope.storyTitle = '';
        $scope.optradio = '1';
        $scope.optradio1 = '1';
        $scope.data = {};
        $scope.storyFlag = false;
        $scope.stories = [];
        
        $scope.loadData = function(){
            console.log('loading');
            
            $http.get('/userStory/get').then(function(resp){
                
                console.log(resp);
                //$scope.data = resp.data[0].title;
                if(!resp.data.error){
                    $rootScope.$broadcast('db-stories-recieved', 
                                 {data: resp.data.stories});
                }
            });
            
        };
        
        $scope.viewStory = function(title){
            
            $http.get('/userStory/get/'+title).then(function(resp){
                
                console.log(resp);
                
                if(!resp.data.error){
                    
                    var story = resp.data.story[0];
                    
                    $scope.uStoryTitle = title;
                    $scope.uDesc = story.description;
                    $scope.uOptradio = ''+story.priority;
                    $scope.uOptradio1 = ''+story.status;
                    $scope.uStoryPoints= story.points;
                    
                    var modalInstance = $uibModal.open({
                                                
                        scope: $scope,
                        templateUrl: '/partials/views/updateStory.html',
                        controller: 'popUp'
                    });
                    
                }
            });
            
        };
        
        $scope.$on('db-stories-recieved', function(evt, data){
            
            console.log('Recieved');
            console.log(data.data);
            $scope.stories = data.data;
            $scope.storyFlag = true;
            
        });
        
        $scope.$on('story-created-refresh', function(evt, data){
            
            $scope.storyFlag = false;
            $scope.loadData();
            
        });
        
        $scope.open = function () {
            
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/partials/views/newStory.html',
                controller: 'popUp'
            });
        };       
        
    };
    
    var app = angular.module('app');
    
    app.controller('backlogCntrl', ['$scope', '$http', '$window', '$uibModal', '$rootScope', backlogCntrl]);
    
    app.controller('popUp', ['$scope', '$http', '$window', '$uibModalInstance', '$rootScope', popUp]);
    
}());