'use strict';

/**
 * @ngdoc function
 * @name bscBarcodeWarApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the bscBarcodeWarApp
 */
angular.module('bscBarcodeWarApp')
  .controller('TestCtrl', ['$scope','$routeParams', 'connector', 'handler', function ($scope,$routeParams,connector, handler) {

    $scope.forms = [];

    $scope.responceStatus = 200;

    try{
      var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.hash.split('?');
        query = query[1];
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          // If first entry with this name
          if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
          } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
          } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
          }
        }
        return query_string;
      }();
    }catch(e){
      QueryString = null;
    }

    $scope.translate = function () {
      $scope.responceStatus = 204;
      connector.send({
        method: 'post',
        path: '/bsc/barcode/rest/translate',
        data: {
          "terminalId": $scope.terminalId,
          "serviceId": $scope.serviceId,
          "encodedBarcode": $scope.base64
        },
        success: function (data) {
          $scope.base64text = data.data.strBarcode;
          $scope.forms = data.data.forms;
          $scope.responceStatus = 200;
          $('#animated1').animateCss('fadeIn');
          $('#animated2').animateCss('fadeIn');
        },
        error: function (data) {
          $scope.responceStatus = 200;
          alertify.error("<h3 class='m-5'>"+data.status+"</h3><div>"+data.data+"</div>");
        }
      });
    };

    if(typeof QueryString != 'undefined' && QueryString != '' && QueryString != null){
      $scope.base64 = QueryString.base || '';
      $scope.terminalId = QueryString.terminal || '';
      $scope.translate();
    }

  }]);
