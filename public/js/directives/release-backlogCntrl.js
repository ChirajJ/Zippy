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
        $scope.rStoryFlag = false;
        $scope.rStories = [];
        $scope.releaseNo = 'R1.0';
        
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
        
        $scope.loadRelData = function(){
            console.log('loading');
            
            var n = $scope.releaseNo;
            
            $http.get('/userStory/release/'+n).then(function(resp){
                
                console.log(resp);
                //$scope.data = resp.data[0].title;
                if(!resp.data.error){
                    $rootScope.$broadcast('db-rel-stories-recieved', 
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
        
        $scope.save = function(){
            
            console.log('on Save');
                
                var rbacklog = $('#area1').children('.items2');
                var backlog = $('#area2').children('.items1');
                
                if(rbacklog.length > 0 || backlog.length > 0){
                    
                    var storiesArray1 = $('#area1 .items2').map(function(){return $(this).attr('value')}).get();
                    
                    var storiesArray2 = $('#area2 .items1').map(function(){return $(this).attr('value')}).get();
                    
                    var data = {
                        sno: $('#releaseSelect').val(), 
                        stories: {
                            len: storiesArray1.length,
                            stories: storiesArray1
                        },
                        dstories: {
                            len: storiesArray2.length,
                            stories: storiesArray2
                        }
                    };
                    
                    console.log(data);
                    
                    $scope.rStoryFlag = false;
                    $scope.storyFlag = false;
                    
                    $http.post('/userStory/release', {
                
                        data: data

                    }).then(function(resp){

                        console.log('Response of release');
                        console.log(resp);
                        $scope.loadData();
                        $scope.loadRelData();
                        
                    });                    
                    
                    console.log('Ajax done');
                }
                
                else{
                    
                    console.log('Else');
                    console.log(rbacklog);
                }
        };
        
        $scope.$on('db-stories-recieved', function(evt, data){
            
            console.log('Recieved');
            console.log(data.data);
            $scope.stories = data.data;
            $scope.storyFlag = true;
            
        });
        
        $scope.$on('db-rel-stories-recieved', function(evt, data){
            
            console.log('Recieved');
            console.log(data.data);
            $scope.rStories = data.data;
            $scope.rStoryFlag = true;
            
        });
        
        $scope.$on('story-created-refresh', function(evt, data){
            
            $scope.storyFlag = false;
            $scope.loadData();
            
        });
        
    };
    
    var app = angular.module('app');
    
    app.controller('releaseBacklogCntrl', ['$scope', '$http', '$window', '$uibModal', '$rootScope', backlogCntrl]);
    
    app.controller('releasePopUp', ['$scope', '$http', '$window', '$uibModalInstance', '$rootScope', popUp]);
    
}());