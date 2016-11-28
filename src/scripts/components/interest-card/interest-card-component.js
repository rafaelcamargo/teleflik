(function(){

  function interestCardController($scope, $ionicPopup, TRACKS, trackService, interestService){
    var _public = this;

    _public.remove = function(interest){
      trackService.track(TRACKS.interests.clickedToRemove, {
        interestKeyword: interest.keyword
      });
      $ionicPopup.confirm({
        title: 'Remover Interesse',
        template: 'Tem certeza que deseja remover esse interesse?'
      }).then(function(hasConfirmed){
        if(hasConfirmed){
          interestService.remove(interest);
          $scope.$emit('interest list item removed');
        } else {
          trackService.track(TRACKS.interests.declinedToRemove, {
            interestKeyword: interest.keyword
          });
        }
      });
    };
  }

  app.component('interestCard', {
    templateUrl: 'components/interest-card/interest-card-template.html',
    controller: [
      '$scope',
      '$ionicPopup',
      'TRACKS',
      'trackService',
      'interestService',
      interestCardController
    ],
    bindings: {
      interest: '='
    }
  });

}());
