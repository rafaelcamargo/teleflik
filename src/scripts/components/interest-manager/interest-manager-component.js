(function(){

  function interestManagerController($scope){
    $scope.$on('interest added', function(evt, interest){
      $scope.$broadcast('interest list outdated', interest);
    });
  }

  app.component('interestManager', {
    templateUrl: 'components/interest-manager/interest-manager-template.html',
    controller: ['$scope', interestManagerController]
  });

}());
