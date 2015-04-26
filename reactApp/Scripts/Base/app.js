
import config from 'Scripts/config.js';
import authInterceptorService from 'Scripts/Base/authInterceptorService.js';
import authService from 'Scripts/Base/authService.js';
import {default as controllers} from 'Scripts/app.controllers.js';
import {default as services} from 'Scripts/app.services.js';
import {default as directives} from 'Scripts/app.directives.js';
import {default as filters} from 'Scripts/app.filters.js';
import jwtReactComs from 'Scripts/Modules/jwtReactComs/jwtReactComs.js';

var moduleName='app'; 

angular.module(moduleName,['ui.router', 'ngResource', 'LocalStorageModule', 'angular-loading-bar','highcharts-ng', 'react', controllers, services, directives, filters,jwtReactComs])
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

