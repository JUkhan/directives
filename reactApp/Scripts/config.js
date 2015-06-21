
export default function config(stateprovider, routeProvider){
	routeProvider.otherwise('root/login');

	stateprovider.state('root',{abstract:true,url:'/root',templateUrl:'Scripts/Layouts/root/root.html',controller:'rootCtrl as vm'});
	stateprovider.state('root.layout2',{abstract:true,url:'/layout2',templateUrl:'Scripts/Layouts/layout2/layout2.html',controller:'layout2Ctrl as vm'});

	stateprovider.state('root.home',{url:'/home',templateUrl:'Scripts/Components/home/home.html',controller:'homeCtrl as vm'});
	stateprovider.state('root.login',{url:'/login',templateUrl:'Scripts/Components/login/login.html',controller:'loginCtrl as vm'});
	stateprovider.state('root.signup',{url:'/signup',templateUrl:'Scripts/Components/signup/signup.html',controller:'signupCtrl as vm'});
	stateprovider.state('associate',{url:'/associate',templateUrl:'Scripts/Components/associate/associate.html',controller:'associateCtrl as vm'});
	stateprovider.state('root.chartNav',{url:'/chartNav',templateUrl:'Scripts/Components/chatWidget/chatWidget.html',controller:'chatWidgetCtrl as vm'});
	stateprovider.state('root.reactNav',{url:'/reactNav',templateUrl:'Scripts/Components/reactWidget/reactWidget.html',controller:'reactWidgetCtrl as vm'});
	stateprovider.state('root.layout2.testNav',{url:'/testNav',views:{'plceholder1':{templateUrl:'Scripts/Components/test/test.html',controller:'testCtrl as vm'},'plceholder2':{templateUrl:'Scripts/Components/home/home.html',controller:'homeCtrl as vm'}}});
	stateprovider.state('root.jwtFormGrid',{url:'/jwtFormGrid',templateUrl:'Scripts/Components/jwtFormGrid/jwtFormGrid.html',controller:'jwtFormGridCtrl as vm'});
}
config.$inject=['$stateProvider', '$urlRouterProvider'];
