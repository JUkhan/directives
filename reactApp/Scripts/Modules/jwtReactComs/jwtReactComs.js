import HelloComponent from 'Scripts/Modules/jwtReactComs/test.js';

var moduleName='jwtReactComs'; 
var app=angular.module(moduleName, []);

//app.value('HelloComponent', HelloComponent);

app.directive('hello', function() {
  return{
      restrict:'ACE',
      scope:{config:'=', data:'@'},
      link:function(scope, element, attr){
          scope.$watch('config', function(newData, oldData){ 
                var config=angular.copy(newData);
                config.data=scope.$parent.vm[scope.data||'data'];
               React.render(React.createElement(HelloComponent, {config: config}), element[0]);
             
            }, true);
      }
  }
});

export default moduleName;
