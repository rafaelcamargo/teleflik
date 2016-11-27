(function(){

  app.service('internetService', [
    '$window',
    function($window){

      var _public = {};

      _public.isOnline = function(){
        return $window.navigator.onLine;
      };

      return _public;

  }]);

}());
