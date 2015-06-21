
import home from 'Scripts/Components/home/homeSvc.js';
import chatWidget from 'Scripts/Components/chatWidget/chatWidgetSvc.js';
import reactWidget from 'Scripts/Components/reactWidget/reactWidgetSvc.js';
import test from 'Scripts/Components/test/testSvc.js';
import jwtFormGrid from 'Scripts/Components/jwtFormGrid/jwtFormGridSvc.js';

var moduleName='app.services';

angular.module(moduleName,[])
.factory('homeSvc', home)
.factory('chatWidgetSvc', chatWidget)
.factory('reactWidgetSvc', reactWidget)
.factory('testSvc', test)
.factory('jwtFormGridSvc', jwtFormGrid);

export default moduleName;