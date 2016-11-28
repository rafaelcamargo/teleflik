(function(){

  app.service('showsCacheService', [
    '$q',
    'TRACKS',
    'trackService',
    'internetService',
    'channelResource',
    'showResource',
    'storageService',
    function($q, TRACKS, trackService, internetService, channelResource, showResource, storageService){

      var _public = {};

      var ONE_DAY = 86400000;
      var TWO_HOURS = 7200000;
      var CACHED_REQUEST_DELAY = 1000;
      var cachedResponses = [];

      _public.get = function(){
        return $q(function(resolve, reject){
          if(!internetService.isOnline())
            reject('offline');

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
        cachedResponses = [];
        return [
          getRequest('channels', channelResource),
          getRequest('shows', showResource)
        ];
      }

      function getRequest(itemType, itemResource){
        if(hasCacheExpired(itemType)){
          cachedResponses.push(false);
          trackService.track(TRACKS[itemType].requesting.fromServer);
          return itemResource.get().$promise;
        } else {
          cachedResponses.push(true);
          trackService.track(TRACKS[itemType].requesting.fromCache);
          return cachedItemPromise(itemType);
        }
      }

      function hasCacheExpired(storageKey){
        var item = getCachedItem(storageKey);
        if(!item || isCachedItemExpired(item, storageKey))
          return true;
      }

      function isCachedItemExpired(item, storageKey){
        var isExpired = item.expiration < new Date().getTime();
        if(isExpired){
          trackService.track(TRACKS[storageKey].expiredCache, {
            expiredOn: new Date(item.expiration).toISOString(),
            now: new Date().toISOString()
          });
          return true;
        }
      }

      function cachedItemPromise(itemKey){
        return $q(function(resolve){
          setTimeout(function(){
            resolve(getCachedItem(itemKey).content);
          }, CACHED_REQUEST_DELAY);
        });
      }

      function getCachedItem(itemKey){
        var item = storageService.get(itemKey);
        return JSON.parse(item);
      }

      function cacheResponses(responses){
        for (var i = 0; i < responses.length; i++){
          if(!cachedResponses[i]){
            var cacheType = i === 0 ? 'channels' : 'shows';
            var cacheInfo = buildCacheInfo(cacheType);
            cacheResponse(cacheType, cacheInfo, responses[i], i);
          }
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
        trackCache(cacheType, cacheInfo, response);
      }

      function trackCache(cacheType, cacheInfo, response){
        trackService.track(TRACKS[cacheType].createdCache, {
          toExpireOn: new Date(cacheInfo.expiration).toISOString(),
          numberOfResultsCached: JSON.parse(response.content).response.docs.length
        });
      }

      return _public;

  }]);

}());
