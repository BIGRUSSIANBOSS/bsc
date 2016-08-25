'use strict';

/**
 * @ngdoc function
 * @name bscBarcodeWarApp.controller:ManageCtrl
 * @description
 * # ManageCtrl
 * Controller of the bscBarcodeWarApp
 */

angular.module('bscBarcodeWarApp')
  .controller('ManageCtrl', ['$scope','connector','handler', function ($scope,connector,handler) {

    $scope.handlerType = false;
    $scope.newHandelModalToggle = false;

    $scope.filter = {
      sorter: {
        handlerId: {
          direction: true
        },
        name: {
          direction: true
        },
        descr: {
          direction: true
        },
        serviceId: {
          direction: true
        },
        type: {
          direction: true
        }
      }
    }

    $scope.cacheBtn = false;

    $scope.newHandlerModal = function () {
      $scope.newHandelModalToggle = true;
    };

    $scope.clearFilter = function () {
      var fields = ['descr','name','serviceId', 'type', 'handlerId'];
      for(var i = 0; i< fields.length; i++){
        $scope['H'+fields[i]] = '';
      }
      $scope.searchInTableBy('');
    };

    $scope.getHandlers = function (obj) {
      obj =obj || {};

      obj.success = obj.success || function (data) {
          $scope.handlers = handler.getHandlers(data);
          $scope.sortBy('handlerId',false);
        };

      connector.send({
        method: 'get',
        path: '/bsc/barcode/rest/handlers',
        success: obj.success
      });
    };

    $scope.refreshNow = function () {
      $scope.cacheBtn = true;
      connector.send({
        method: 'post',
        path: '/bsc/barcode/rest/cache/refreshNow',
        success:
          function (data) {
            alertify.success('Кэш обновлен');
            $scope.cacheBtn = false;
            $scope.getHandlers();
          }
      });
    };

    $scope.newHandler = function () {
      var handlerResponce = {};
      if(!$scope.handlerType){
        if($scope.service_id == null || $scope.service_id == ''){
          alertify.error('НЕ ЗАБЫВАЕМ про serviceId!!!');
          return;
        }
        handlerResponce = {
          "type": 'LOCAL',
          "name": $scope.newname,
          "descr": $scope.descr,
          "serviceId": $scope.service_id
        };
      }else{
        handlerResponce = {
          "type": 'DEFAULT',
          "name": $scope.newname,
          "descr": $scope.descr
        };
      }
      connector.send({
        method: 'put',
        path: '/bsc/barcode/rest/handlers/handler/',
        data: handlerResponce,
        success: function (data) {
          $scope.newHandelModalToggle = false;
          $scope.getHandlers();
          var win = window.open(buildUrl('#/handler/'+data.data.handler.handlerId), '_blank');
          win.focus();
        }
      });
    };

    $scope.sortBy = function (type, direction) {
      direction = direction || false;
      $scope.filter.sorter[type].direction = !$scope.filter.sorter[type].direction;
      $scope.handlers.sort(function(a,b){ // чтобы небыло рандомной сортировки
        if(a['handlerId'] < b['handlerId'] || a['handlerId'] == null){
          return -1;
        }else{
          return 1;
        }
      });
      console.log(type);
      $scope.handlers.sort(function(a,b){
        if(a[type] == null){
          a[type] = '';
        }
        if(b[type] == null){
          b[type] = '';
        }

        if(direction == false){
          if(a[type] > b[type]){
            return -1;
          }else{
            return 1;
          }
        }else{
          if(a[type] < b[type]){
            return -1;
          }else{
            return 1;
          }
        }
      });
    }

    $scope.searchInTableBy = function (type) {

      var that = this;

      this.isInHandler = function (id) {
        var fields = ['descr','name','serviceId', 'type'];
        var result = true;
        for(var i = 0; i< fields.length; i++){
          $scope.handlers[id][fields[i]] = $scope.handlers[id][fields[i]] || '';
          $scope['H'+fields[i]] = $scope['H'+fields[i]] || '';
          // console.log($scope.handlers[id][fields[i]]+"|"+$scope['H'+fields[i]].toLowerCase()+": "+$scope['H'+fields[i]], $scope.handlers[id][fields[i]].toString().toLowerCase().indexOf($scope['H'+fields[i]].toLowerCase()) != -1);
          if ($scope.handlers[id][fields[i]].toString().toLowerCase().indexOf($scope['H'+fields[i]].toLowerCase()) != -1) {
          }else{
            return false;
          }
        }
        return true;
      }

      this.filterHandlers = function(name){
        for(var id in $scope.handlers){
          if (that.isInHandler(id)) {
            $scope.handlers[id].visible = true;
          } else {
            $scope.handlers[id].visible = false;
          }
        }
      };
      this.filterHandlers(type);
    };

    $scope.getVersions = function (handler_id) {
      window.location = '#/handler/'+handler_id;
    };

    $scope.deleteConfirm = function (handler) {
      alertify.confirm("Вы уверены что хотите удалить - "+handler.name,
        function(e){
          if (e) {
            connector.send({
              method: 'delete',
              path: '/bsc/barcode/rest/handlers/handler/'+handler.handlerId,
              success: function (data) {
                console.log(data);
                for(var id in $scope.handlers){
                  if ($scope.handlers[id].handlerId == handler.handlerId) {
                    $scope.handlers.splice(id,1);
                    alertify.error('Удалено!');
                  }
                }
              }
            });
          } else {
            alertify.error('Ладно, НЕ удаляю!');
          }
        });
    };

    $scope.getHandlers(); // first start

    $scope.searchHandler = function () {
      $scope.searchString = $scope.searchString.toLowerCase();
      for(var id in $scope.handlers){

        $scope.handlers[id].name = $scope.handlers[id].name || '';
        $scope.handlers[id].descr = $scope.handlers[id].descr || '';
        $scope.handlers[id].serviceId = $scope.handlers[id].serviceId || '';
        $scope.handlers[id].serviceId = $scope.handlers[id].serviceId.toString();

        if($scope.handlers[id].type != null && $scope.handlers[id].descr != null){
          if($scope.handlers[id].descr.toLowerCase().indexOf($scope.searchString.toLowerCase()) != -1 || $scope.handlers[id].name.toLowerCase().indexOf($scope.searchString.toLowerCase()) != -1 || $scope.handlers[id].serviceId.toString().toLowerCase().indexOf($scope.searchString.toLowerCase()) != -1){
            $scope.handlers[id].visible = true;
          }else{
            $scope.handlers[id].visible = false;
          }
        }else{
          if($scope.searchString == '' || $scope.searchString == null){
            $scope.handlers[id].visible = true;
          }else{
            $scope.handlers[id].visible = false;
          }
        }
      }
    };

  }]);
