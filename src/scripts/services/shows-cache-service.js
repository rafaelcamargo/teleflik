(function(){

  app.service('showsCacheService', [
    '$q',
    'channelResource',
    'showResource',
    'storageService',
    function($q, channelResource, showResource, storageService){

      var _public = {};

      var ONE_DAY = 86400000;
      var TWO_HOURS = 7200000;
      var CACHED_REQUEST_DELAY = 1000;

      _public.get = function(){
        return $q(function(resolve, reject){
          $q.all(buildRequests())
              .then(function(responses){
                cacheResponses(responses);
                resolve(responses);
              }, function(error){
                reject(error);
              });
        });
      };

      function buildRequests(){
        return [
          getRequest('channels', channelResource),
          getRequest('shows', showResource)
        ];
      }

      function getRequest(itemType, itemResource){
        if(hasCacheExpired(itemType))
          return itemResource.get().$promise;
        else
          return cachedItemPromise(itemType);
      }

      function hasCacheExpired(storageKey){
        var item = getCahchedItem(storageKey);
        if(!item || isCachedItemExpired(item))
          return true;
      }

      function isCachedItemExpired(item){
        return item.expiration < new Date().getTime();
      }

      function cachedItemPromise(itemKey){
        return $q(function(resolve){
          setTimeout(function(){
            resolve(getCahchedItem(itemKey).content);
          }, CACHED_REQUEST_DELAY);
        });
      }

      function getCahchedItem(itemKey){
        var item = storageService.get(itemKey);
        return JSON.parse(item);
      }

      function cacheResponses(responses){
        for (var i = 0; i < responses.length; i++){
          var cacheType = i === 0 ? 'channels' : 'shows';
          var cacheInfo = buildCacheInfo(cacheType);
          cacheResponse(cacheType, cacheInfo, responses[i]);
        }
      }

      function buildCacheInfo(cacheType){
        return {
          key: cacheType,
          expiration: getCacheExpirationValue(cacheType)
        };
      }

      function getCacheExpirationValue(cacheType){
        var maxAge = cacheType == 'shows' ? TWO_HOURS : ONE_DAY;
        return new Date().getTime() + maxAge;
      }

      function cacheResponse(cacheType, cacheInfo, response){
        var item = {
          expiration: cacheInfo.expiration,
          content: response
        };
        storageService.set(cacheType, JSON.stringify(item));
      }

      return _public;

  }]);

}());
