  "use strict";

angular.module('app')
.controller('searchCtrl', ['dict', '$http', '$scope', function(dict, $http, $scope) {
  $scope.name = '';
  $scope.search = function() {
    $http.get('data/positionList.json?name=' + $scope.name )
    .then(function(res) {
      $scope.positionList = res.data;
    })
  }
  $scope.search();
  $scope.sheet = {};
  $scope.tabList = [{
    id: 'city',
    name: '城市'
  }, {
    id: 'salary',
    name: '薪水'
  }, {
    id: 'scale',
    name: '公司规模'
  }];
  var tabId = '';
  $scope.tClick = function(id, name) { // tabClick
    tabId = id;
    $scope.sheet.list = dict[id];
    $scope.sheet.visible = true;
  }
  $scope.filterObj = {};

  $scope.sClick = function(id, name) { // sheetClick
    if(id) {
      angular.forEach($scope.tabList, function(item) {
        if(item.id === tabId) {
          item.name = name;
        }
      })
      $scope.filterObj[tabId + 'Id'] = id; //为了符合json数据规范
    } else {
      delete $scope.filterObj[tabId + 'Id'];
      angular.forEach($scope.tabList, function(item) {
        switch(item.id) {
          case 'city':
            item.name = '城市';
          break;
          case 'salary':
            item.name = '薪水';
          break;
          case 'scale':
            item.name = '公司规模';
          break;
        }
      })
    }
  }

}])
