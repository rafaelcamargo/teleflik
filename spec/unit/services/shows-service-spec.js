describe('Shows Service', function(){

  var mockedInterests = [{
    id: 1483037910382,
    keyword: 'world'
  }, {
    id: 1483049999822,
    keyword: 'montanha'
  }];
  var showsCacheServiceMockedReponse = [{
    content: '{"response":{"start":0,"docs":[' +
        '{"nome":"BBC World News","id_canal":"409","st_canal":"bbc_world_news","cn_canal":"202"},' +
        '{"nome":"The History Channel","id_canal":"441","st_canal":"the_history_channel","cn_canal":"83"}' +
      ']}}'
  }, {
    content: '{"response":{"docs":[' +
        '{"titulo":"Our World","dh_fim":"2016-12-29T21:00Z","dh_inicio":"2016-12-29T20:30Z","st_titulo":"our_world","id_canal":"409","id_programa":"119950"},' +
        '{"titulo":"Our World","dh_fim":"2016-12-29T23:00Z","dh_inicio":"2016-12-29T22:30Z","st_titulo":"our_world","id_canal":"409","id_programa":"119950"},' +
        '{"titulo":"Calimero","dh_fim":"2016-12-30T09:15Z","dh_inicio":"2016-12-30T09:04Z","st_titulo":"calimero","id_canal":"480","id_programa":"523557"},' +
        '{"titulo":"Homens da Montanha","dh_fim":"2016-12-30T08:15Z","dh_inicio":"2016-12-30T07:30Z","st_titulo":"homens_da_montanha","id_canal":"441","id_programa":"464565"}' +
      ']}}'
  }];

  var spyOnShowsCacheService,
    showsCacheService,
    showsService;

  beforeEach(function(){
    module('teleflik');
  });

  beforeEach(inject(function($injector){
    showsService = $injector.get('showsService');
    showsCacheService = $injector.get('showsCacheService');

    spyOnShowsCacheService = function(shouldCallSuccess, shouldCallError){
      spyOn(showsCacheService, 'get').and.returnValue({
        then: function(successCallback, errorCallback){
          if(shouldCallSuccess)
            successCallback(showsCacheServiceMockedReponse);
          else if(shouldCallError)
            errorCallback();
        }
      });
    }
  }));

  it('should have getInteresting method defined', function(){
    expect(showsService.getInteresting).toBeDefined();
  });

  it('should getInteresting method return a promise', function(){
    spyOnShowsCacheService()
    var promise = showsService.getInteresting();

    expect(promise.then).toBeDefined();
  });

  it('should call method responsible for filtering tv shows after get shows data', function(){
    spyOn(showsService, 'filterShowsByInterests');
    spyOnShowsCacheService(true);
    showsService.getInteresting(mockedInterests);

    expect(showsCacheService.get).toHaveBeenCalled();
    expect(showsService.filterShowsByInterests).toHaveBeenCalledWith(showsCacheServiceMockedReponse, mockedInterests);
  });

  it('should filter return only shows that match interests', function(){
    var interestingShows = showsService.filterShowsByInterests(showsCacheServiceMockedReponse, mockedInterests);

    expect(interestingShows.length).toEqual(2);


    expect(interestingShows[0].title).toEqual('Our World');
    expect(interestingShows[0].date).toEqual('29/12');
    expect(interestingShows[0].time).toEqual('20:30');
    expect(interestingShows[0].media.name).toEqual('BBC World News');
    expect(interestingShows[0].media.number).toEqual('202');
    expect(interestingShows[0].interest).toEqual('world');

    expect(interestingShows[1].title).toEqual('Homens da Montanha');
    expect(interestingShows[1].date).toEqual('30/12');
    expect(interestingShows[1].time).toEqual('07:30');
    expect(interestingShows[1].media.name).toEqual('The History Channel');
    expect(interestingShows[1].media.number).toEqual('83');
    expect(interestingShows[1].interest).toEqual('montanha');
  });

});
