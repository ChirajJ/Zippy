(function(){
    
    angular.module('app').config(function($provide){
        $provide.decorator('$exceptionHandler', ['$delegate', function($delegate){
            
            return function(exception, cause){
                //$delegate(exception, cause);
                console.log('inside App Config exception handler');
                alert(exception.message);
                console.log('message');
                console.log(exception.message);
                console.log(exception);
            }
            
        }]);
    });
    
}());