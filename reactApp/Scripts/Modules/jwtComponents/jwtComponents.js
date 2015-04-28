import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';

var moduleName='jwtComponents'; 
var app=angular.module(moduleName, []);
app.directive('grid', function() {
  return{
      restrict:'ACE',
      scope:{options:'=', data:'='},
      link:function(scope, element, attr){
          console.log(scope.data);
          scope.$watch('options', function(newData, oldData){ 
               React.render(React.createElement(JwtGrid, {options: scope.options, data:scope.data}), element[0]);
            }, true);
      }
  }
});
export default moduleName;
