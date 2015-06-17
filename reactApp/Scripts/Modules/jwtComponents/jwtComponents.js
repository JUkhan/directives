import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';
import JwtTreeGrid from 'Scripts/Modules/jwtComponents/JwtTreeGrid.js';

var moduleName='jwtComponents'; 
var app=angular.module(moduleName, []);
app.directive('grid', function() {
  return{
      restrict:'ACE',
      scope:{options:'=', data:'='},
      link:function(scope, element, attr){
          
          scope.$watch('options', function(newData, oldData){ 
               React.render(React.createElement(JwtGrid, {options: scope.options, data:scope.data}), element[0]);
            }, true);
      }
  }
});
app.directive('tgrid', function() {
  return{
      restrict:'ACE',
      scope:{options:'=', data:'='},
      link:function(scope, element, attr){
          
          scope.$watch('options', function(newData, oldData){ 
               React.render(React.createElement(JwtTreeGrid, {options: scope.options, data:scope.data}), element[0]);
            }, true);
      }
  }
});
app.directive('spark', function() {
  return{
      restrict:'ACE',
      replace:true, template:'<span></span>',
      scope:{options:'=', data:'='},
      link:function(scope, element, attr){          
          scope.$watch('data', function(newData, oldData){ 
               $(element).sparkline(scope.data, scope.options);
            }, true);
      }
  }
});
export default moduleName;
