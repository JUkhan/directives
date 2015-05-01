
import config from 'Scripts/config.js';
import authInterceptorService from 'Scripts/Base/authInterceptorService.js';
import authService from 'Scripts/Base/authService.js';
import controllers from 'Scripts/app.controllers.js';
import services from 'Scripts/app.services.js';
import directives from 'Scripts/app.directives.js';
import filters from 'Scripts/app.filters.js';
import jwtComponents from 'Scripts/Modules/jwtComponents/jwtComponents.js';

var moduleName='app'; 

angular.module(moduleName,['ui.router', 'ngResource', 'LocalStorageModule', 'angular-loading-bar','highcharts-ng',  controllers, services, directives, filters,jwtComponents])
    .factory('authInterceptorService', authInterceptorService)
    .factory('authService', authService)
    .config(config)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    })
    .constant('ngAuthSettings', {
        stsServiceBaseUri: 'http://dacw0066/sts/',        
        apiServiceBaseUri: 'http://dacw0066/WebApi/',
        clientId: 'jwtApp'//nativeApp//jwtApp
    })
    .run(['authService', '$rootScope', '$templateCache', function(authService, $rootScope, $templateCache) {
        authService.fillAuthData();
        $rootScope.$on('$viewContentLoaded', function() {
            $templateCache.removeAll();
        });
    }]);

export default moduleName;

