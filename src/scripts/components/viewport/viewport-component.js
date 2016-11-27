(function(){

  function viewportController($window, $scope){
    var _public = this;

    _public.$onDestroy = function(){
      $window.removeEventListener('resize', refreshViewportHeight);
    };

    function setViewportHeight(){
      _public.style = {
        height: ($window.innerHeight-50) + 'px'
      };
    }

    function refreshViewportHeight(){
      setViewportHeight();
      $scope.$digest();
    }

    $window.addEventListener('resize', refreshViewportHeight);

    setViewportHeight();
  }

  app.component('viewport', {
    templateUrl: 'components/viewport/viewport-template.html',
    transclude: true,
    controller: ['$window', '$scope', viewportController]
  });

}());
