(function(){
    
    var reportCntrl = function($scope, $http, $rootScope){
        
        $scope.reportType = $scope.sprNo = '--select--';
        $scope.reportFlag = false;
        $scope.sprFlag = false;
        $scope.velFlag = false;
        $scope.sprDataFlag = false;
        
        
        
        $scope.loadReport = function(){
            
            $scope.sprFlag = false;
            $scope.velFlag = false;
            if($scope.reportType !== '--select--'){
                
                $scope.sprFlag = false;
                $scope.velFlag = false;
                
                if($scope.reportType === 'Sprint report'){
                    
                    console.log('Sprint Report');
                    $scope.sprFlag = true;
                    console.log($scope.sprFlag);
                    //$rootScope.$broadcast('load-Sprint-data');
                }
                
                if($scope.reportType === 'Velocity report'){
                    
                    console.log('Velocity Report');
                    
                    $http.get('/userStory/sprint/')
                        .then(function(resp){
                        
                        var data = resp.data.stories;
                        var data1 = new Array();
                        var data2 = new Array();
                        var ydata = new Array();
                        
                        $scope.labels = new Array();
                        
                        for(var i in data){
                            
                            var num = data[i].number;
                            $scope.labels.push(num);
                            data1.push(data[i].dpoints);
                            data2.push(data[i].points);
                            
                        }
                        
                        console.log(data);
                        
                        $scope.series = ['Obtained', 'Ideal'];
                        
                        $scope.data =[data1, data2];
                        
                        $scope.velFlag = true;
                        
                    });                   
                    
                    console.log($scope.sprFlag);
                }
                
            }
            else{
                
                $scope.reportFlag = false;
                
            }
        };
        
        $scope.loadSpr = function(){
            
            $http.get('/userStory/sprintDet/' + $scope.sprNo)
                .then(function(resp){
                
                var data = resp.data.stories;
                var days = data.days;
                var effort = new Array();
                var sPoints = new Array();
                var ideal = new Array();
                
                $scope.labels = new Array();
                
                effort.push(data.hCommited);
                $scope.labels.push(0);
                var j =1;
                for(var i in days){
                    
                    var day = days[i];
                    var tmp = data.hCommited - day[1];
                    effort.push(tmp);
                    
                    $scope.labels.push(j);
                    j++;
                }
                
                ideal.push(data.points);
                ideal.push(0);
                
                $scope.series = ['Series A'];
                
                $scope.data = [effort];
                
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
                $scope.datasetOverride = [{
                    yAxisID: 'y-axis-1' 
                },{
                    yAxisID: 'y-axis-2'
                }];
                $scope.options = {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'
                            }
                        ]
                    }
                };
                
                $scope.sprDataFlag = true;
                console.log(resp);
                
            });
            
        };
        
    };
    
    var app = angular.module('app');    
    
    app.controller('reportCntrl', ['$scope', '$http', '$rootScope', reportCntrl]);
    
}());