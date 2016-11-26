(function(){

  app.factory('channelResource', [
    '$resource',
    'API',
    function($resource, API) {

      return $resource(API.ENDPOINTS.BASE, {}, {
        get: {
          method: 'GET',
          params: {
            url: API.ENDPOINTS.CHANNELS
          }
        }
      });

  }]);

}());
