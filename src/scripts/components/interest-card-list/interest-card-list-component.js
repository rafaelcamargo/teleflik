(function(){

  function interestListController($scope, TRACKS, trackService, interestService){
    var _public = this;

    $scope.$on('interest list outdated', updateList);
    $scope.$on('interest list item removed', getList);

    function getList(){
      _public.interests = interestService.getAll();
      trackService.track(TRACKS.interests.loadedList, {
        numberOfInterests: _public.interests.length
      });
    }

    function updateList(evt, interest){
      _public.interests.unshift(interest);
      trackService.track(TRACKS.interests.updatedList, {
        interestUpdated: interest.keyword,
        numberOfInterests: _public.interests.length
      });
    }

    getList();
  }

  app.component('interestCardList', {
    templateUrl: 'components/interest-card-list/interest-card-list-template.html',
    controller: [
      '$scope',
      'TRACKS',
      'trackService',
      'interestService',
      interestListController
    ]
  });

}());
