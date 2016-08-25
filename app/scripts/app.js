'use strict';

$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});

/**
 * @ngdoc overview
 * @name bscBarcodeWarApp
 * @description
 * # bscBarcodeWarApp
 *
 * Main module of the application.
 */

angular
  .module('bscBarcodeWarApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngResource',
    'angular-clipboard',
    'ui.grid',
    'ui.grid.selection'
  ]).controller('appCtrl', ['$location', '$scope',function ($location, $scope) {
  $scope.location = $location.path();
  // $scope.AUTH = AUTH;
  $scope.$on('$routeChangeStart', function(){
    function equalize(){

      $('[equalizer]').each(function () { // делает колонки одинаковой высоты
        var max_height = 0;
        $(this).find('[equal]').each(function () {
          if($(this).height() > max_height){
            max_height = $(this).height();
          }
        });
        $(this).find('[equal]').each(function () {

          if(Number($(this).attr('equal')) > 0){
            $(this).height(max_height / Number($(this).attr('equal')) - 10);
          }else{
            $(this).height(max_height);
          }

        });
      });
    }
    setTimeout(equalize,100);
    $scope.location = $location.path();
  });
}]).config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .when('/manage', {
      templateUrl: 'views/manage.html',
      controller: 'ManageCtrl',
      controllerAs: 'manage'
    })
    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'TestCtrl',
      controllerAs: 'test'
    })
    .when('/search', {
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl',
      controllerAs: 'search'
    })
    .when('/handler/:id', {
      templateUrl: 'views/handlers.html',
      controller: 'HandlersCtrl',
      controllerAs: 'handlers'
    })
    .otherwise({
      redirectTo: '/'
    });
});
