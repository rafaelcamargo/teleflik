(function(){

  function showCardListController(interestService, showsService){
    var _public = this;

    _public.interests = interestService.getAll();

    _public.shows = [];

    _public.results = {
      label: ''
    };

    function builtResultsLabel(shows){
      _public.results.label = 'interesse à vista';
      if(shows.length > 1)
        _public.results.label = 'interesses à vista';
    }

    function onGettingInterestingShows(response){
      _public.shows = response.length ? response : false;
      if(_public.shows)
        builtResultsLabel(_public.shows);
    }

    if(_public.interests.length)
      showsService.getInteresting(_public.interests)
        .then(function(response){
          onGettingInterestingShows(response);
        }, function(error){
          console.log(error);
        });
  }

  app.component('showCardList', {
    templateUrl: 'components/show-card-list/show-card-list-template.html',
    controller: ['interestService', 'showsService', showCardListController]
  });

}());
