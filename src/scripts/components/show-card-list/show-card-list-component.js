(function(){

  function showCardListController(interestService, showsService){
    var _public = this;

    _public.interests = interestService.getAll();

    _public.shows = [];

    _public.results = null;

    _public.error = null;

    function builtResults(shows){
      var baseLabel = shows.length > 1 ? 'interesses' : 'interesse';
      return {
        label: baseLabel + ' à vista.'
      };
    }

    function onGettingInterestingShows(response){
      _public.shows = response.length ? response : false;
      if(_public.shows)
        _public.results = builtResults(_public.shows);
    }

    function onGettingError(error){
      _public.error = buildError(error);
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
  }

  app.component('showCardList', {
    templateUrl: 'components/show-card-list/show-card-list-template.html',
    controller: ['interestService', 'showsService', showCardListController]
  });

}());
