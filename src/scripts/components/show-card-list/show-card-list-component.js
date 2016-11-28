(function(){

  function showCardListController($location, TRACKS, trackService, interestService, showsService){
    var _public = this;

    _public.interests = interestService.getAll();

    _public.shows = [];

    _public.results = null;

    _public.error = null;

    _public.goToInterestsView = function(){
      trackService.track(TRACKS.interests.clickedAddButton, {
        context: 'no results blankslate button'
      });
      $location.path('/interests');
    };

    function builtResults(shows){
      var baseLabel = shows.length > 1 ? 'interesses' : 'interesse';
      return {
        label: baseLabel + ' à vista.'
      };
    }

    function onGettingInterestingShows(response){
      _public.shows = response.length ? response : false;
      if(_public.shows){
        _public.results = builtResults(_public.shows);
        trackService.track(TRACKS.shows.loaded, {
          numberOfShows: _public.shows.length
        });
      } else {
        trackService.track(TRACKS.shows.blankslates.noResults, {
          interests: _public.interests
        });
      }
    }

    function onGettingError(error){
      _public.error = buildError(error);
      trackService.track(TRACKS.shows.failed, {
        reason: error
      });
    }

    function buildError(error){
      if(error == 'offline')
        return 'Parece que você está sem internet.';
      return 'O servidor parece estar com a àgua no pescoço. Tente novamente mais tarde.';
    }

    if(_public.interests.length)
      showsService.getInteresting(_public.interests)
        .then(function(response){
          onGettingInterestingShows(response);
        }, function(error){
          onGettingError(error);
        });
    else
      trackService.track(TRACKS.shows.blankslates.noInterests);
  }

  app.component('showCardList', {
    templateUrl: 'components/show-card-list/show-card-list-template.html',
    controller: [
      '$location',
      'TRACKS',
      'trackService',
      'interestService',
      'showsService',
      showCardListController
    ]
  });

}());
