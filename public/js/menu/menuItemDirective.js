(function(){
    
    var linkFunc = function(scope, el, attr, ctrl){
        
        scope.isActive = function(){
            return el === ctrl.getActiveItem();
        };
        
        el.on('click', function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            scope.$apply(function(){
                ctrl.setActiveItem(el);
                ctrl.setRoute(scope.route);
            });
        });
    };
    
    var menu = function(){
        
        return{
            require: '^myMenu',
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            templateUrl: '/partials/menu/menuItem.html',
            link: linkFunc
        };
        
    };
    
    var app = angular.module('myMenu');
    
    app.directive('myMenuItem', menu);
    
}());