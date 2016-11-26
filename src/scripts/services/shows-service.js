(function(){

  'use strict';

  app.service('showsService', [
    '$q',
    'channelResource',
    function($q, channelResource){

      var _public = {};

      _public.getInteresting = function(interests){
        return $q(function(resolve, reject) {
          $q.all(buildPromises())
            .then(function(responses){
              resolve(filterResponsesByInterests(responses, interests));
            }, function(error){
              reject(error);
            });
        });
      };

      function buildPromises(){
        return [
          channelResource.get().$promise
        ];
      }

      function filterResponsesByInterests(responses, interests){
        return responses;
      }

      return _public;

  }]);

}());
