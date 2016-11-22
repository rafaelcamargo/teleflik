(function(){

  function topbarController($window){
    var _public = this;

    _public.back = function(){
      $window.history.back();
    };
  }

  app.component('topbar', {
    templateUrl: 'components/topbar/topbar-template.html',
    bindings: {
      title: '@'
    },
    transclude: {
      'topbarContentLeft': '?topbarContentLeft',
      'topbarContentRight': '?topbarContentRight'
    },
    controller: ['$window', topbarController]
  });

}());
