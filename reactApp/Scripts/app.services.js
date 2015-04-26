
import home from 'Scripts/Components/home/homeSvc.js';
import chatWidget from 'Scripts/Components/chatWidget/chatWidgetSvc.js';
import reactWidget from 'Scripts/Components/reactWidget/reactWidgetSvc.js';

var moduleName='app.services';

angular.module(moduleName,[])
.factory('homeSvc', home)
.factory('chatWidgetSvc', chatWidget)
.factory('reactWidgetSvc', reactWidget);

export default moduleName;