
import home from 'Scripts/Components/home/homeCtrl.js';
import login from 'Scripts/Components/login/loginCtrl.js';
import signup from 'Scripts/Components/signup/signupCtrl.js';
import associate from 'Scripts/Components/associate/associateCtrl.js';
import chatWidget from 'Scripts/Components/chatWidget/chatWidgetCtrl.js';
import reactWidget from 'Scripts/Components/reactWidget/reactWidgetCtrl.js';
import test from 'Scripts/Components/test/testCtrl.js';
import jwtFormGrid from 'Scripts/Components/jwtFormGrid/jwtFormGridCtrl.js';
import root from 'Scripts/Layouts/root/rootCtrl.js';
import layout2 from 'Scripts/Layouts/layout2/layout2Ctrl.js';

var moduleName='app.controllers';

angular.module(moduleName,[])
.controller('homeCtrl', home)
.controller('loginCtrl', login)
.controller('signupCtrl', signup)
.controller('associateCtrl', associate)
.controller('chatWidgetCtrl', chatWidget)
.controller('reactWidgetCtrl', reactWidget)
.controller('testCtrl', test)
.controller('jwtFormGridCtrl', jwtFormGrid)
.controller('rootCtrl', root)
.controller('layout2Ctrl', layout2);

export default moduleName;