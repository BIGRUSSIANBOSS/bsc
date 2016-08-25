'use strict';

/**
 * @ngdoc function
 * @name bscBarcodeWarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bscBarcodeWarApp
 */

function isset(obj){
  try{
    if(typeof obj == 'undefined'){
      return false;
    }else{
      return true;
    }
  }catch(e){
    return false;
  }
}
function buildUrl(url, parameters){
  var qs = "";
  for(var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  if (qs.length > 0){
    qs = qs.substring(0, qs.length-1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}


angular.module('bscBarcodeWarApp')
    .controller('MainCtrl', ['$scope','connector','handler','$interval','uiGridConstants',function ($scope,connector,handler,$interval,uiGridConstants) {
      $scope.logs = [];

      $scope.currentHandler = {};

      $scope.responceStatus = 200;

      $scope.encodeURIComponent = function (url) {
        return encodeURIComponent(url);
      };

      $scope.getHandlers = function (obj) {
        obj =obj || {};

        obj.success = obj.success || function (data) {
            $scope.handlers = handler.getHandlers(data);
            console.log($scope.handlers);
          };

        connector.send({
          method: 'get',
          path: '/bsc/barcode/rest/handlers',
          success: obj.success
        });
      };
      $scope.getHandlers();

      $scope.showHandler = function (handlerId, base64) {
        var win = window.open(buildUrl('#/handler/'+handlerId,{
          'barcode': base64
        }), '_blank');
        win.focus();
      }

      $scope.logfrom = new Date(Date.now() - (1*60*60*1000));
      $scope.logto = new Date(Date.now());
      $scope.logto.setHours(23);
      $scope.logto.setMinutes(59);
      $scope.logto.setSeconds(59);
      $scope.logto.setMilliseconds(999);

      $scope.getVersions = function (handler_id) {
        window.location = '#/handler/'+handler_id;
      };

      $scope.checkBASE = function (base, terminal) {
        var win = window.open(buildUrl('#/test',{
          'base': base,
          'terminal': terminal
        }), '_blank');
        win.focus();
      };
      function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
      }

      $scope.gridOptions = {
        enableRowSelection : true,
        multiSelect : false,
        enableRowHeaderSelection: false,
        onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi;
          $scope.gridApi.selection.on.rowSelectionChanged($scope,
            function(row) {
              $scope.showDetails($scope.gridApi.selection.getSelectedRows());
            });
        }
      };
      $scope.gridOptions.modifierKeysToMultiSelect = false;
      $scope.gridOptions.noUnselect = true;

      $scope.showDetails = function (data) {
        $scope.currentDetail = data[0];
      };


      $scope.logEvents = function () {
        var data = {};

        $scope.responceStatus = 204;

        if(isset($scope.logfrom)){
          data.from = $scope.logfrom;
        }
        if(isset($scope.logto)){
          data.to = $scope.logto;
        }
        if(isset($scope.terminalId)){
          if($scope.terminalId != ''){
            data.terminalId = $scope.terminalId;
          }
        }
        if(isset($scope.barcode)){
          if($scope.barcode != ''){
            data.searchInBarcode = $scope.barcode;
          }
        }
        if(isset($scope.result)){
          if($scope.result != ''){
            data.result = $scope.result;
          }
        }

        connector.send({
          method: 'get',
          path: '/bsc/barcode/rest/log/events',
          data: data,
          success: function (data) {
            $scope.gridOptions.data = data.data.logEvents;
            $scope.gridOptions.columnDefs = [
              {field : 'terminalId', displayName: 'ID Терминала',width:'15%'},
              {
                field : 'requestDateTime',
                displayName: 'Дата',
                width:'15%',
                cellFilter: 'date:"dd.MM.yyyy HH:mm:ss"',
                sort: {
                  direction: uiGridConstants.DESC,
                  priority: 0
                }
              },
              {field : 'durationMs', displayName: 'Задержка',width:'12%'},
              {field : 'result.runtimeCode', displayName: 'Статус',width:'12%'},
              {field : 'strBarcode', displayName: 'Текст'},
              {field : 'logDetail', displayName: 'Детали',width:'6%',
                cellTemplate: '<span class="showDetail text-center"><span class="badge mybadge" ng-show="row.entity.logDetail.length" ng-class="{\'cblue\':row.entity.logDetail.length == 1}">{{row.entity.logDetail.length}}</span><i ng-show="!row.entity.logDetail.length" class="flaticon-signs fullDetail"></i></span>'}
            ];

            // $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);
            $scope.responceStatus = 200;
          },
          error: function (data) {
            alertify.error("<h3 class='m-5'>"+data.status+"</h3><div>"+data.data+"</div>");
            $scope.responceStatus = 200;
          }
        });
      }
    }]);
