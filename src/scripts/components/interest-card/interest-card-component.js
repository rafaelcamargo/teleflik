(function(){

  function interestCardController($scope, $ionicPopup, interestService){
    var _public = this;

    _public.remove = function(interest){
      $ionicPopup.confirm({
        title: 'Remover Interesse',
        template: 'Tem certeza que deseja remover esse interesse?'
      }).then(function(hasConfirmed){
        if(hasConfirmed){
          interestService.remove(interest);
          $scope.$emit('interest list item removed');
        }
      });
    };
  }

  app.component('interestCard', {
    templateUrl: 'components/interest-card/interest-card-template.html',
    controller: ['$scope', '$ionicPopup', 'interestService', interestCardController],
    bindings: {
      interest: '='
    }
  });

}());
