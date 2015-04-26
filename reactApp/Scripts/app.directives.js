import jwtFilter from 'Scripts/Directives/jwtFilter/jwtFilter.js';
import spark from 'Scripts/Directives/spark/spark.js';
import tableCom from 'Scripts/Directives/tableCom/tableCom.js';


var moduleName='app.Directives';

angular.module(moduleName, [])
.directive('jwtFilter', jwtFilter.builder)
.directive('spark', spark.builder)
.directive('tableCom', tableCom.builder)
;

export default moduleName;