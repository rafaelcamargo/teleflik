(function(){

  'use strict';

  window.app = angular.module('teleflik', [
    'ionic',
    'templates',
    'ngResource',
    'angulartics',
    'angulartics.google.analytics'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        if (ionic.Platform.isAndroid()) {
          StatusBar.backgroundColorByHexString("#982B61");
        } else {
          StatusBar.styleLightContent();
        }
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    var VIEWS_ROOT = 'views';

    function getViewTemplateUrl(view){
      return [VIEWS_ROOT,view,view].join('/') + '-template.html';
    }

    $stateProvider.state('home', {
      url: '/',
      templateUrl: getViewTemplateUrl('home')
    }).state('interests', {
      url: '/interests',
      templateUrl: getViewTemplateUrl('interests')
    });

    $urlRouterProvider.otherwise('/');
  });

}());
