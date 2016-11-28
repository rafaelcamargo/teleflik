(function(){

  function menuController($location, TRACKS, trackService){
    var _public = this;

    _public.goToInterestsView = function(){
      trackService.track(TRACKS.interests.clickedAddButton, {
        context: 'topbar'
      });
      $location.path('/interests');
    };
  }

  app.component('menu', {
    templateUrl: 'components/menu/menu-template.html',
    controller: [
      '$location',
      'TRACKS',
      'trackService',
      menuController
    ]
  });

}());
