describe('Shows Service', function(){

  var showsService;

  beforeEach(function(){
    module('teleflik');
  });

  beforeEach(inject(function($injector){
    showsService = $injector.get('showsService');
  }));

  it('should have getInteresting method defined', function(){
    expect(showsService.getInteresting).toBeDefined();
  });

});
