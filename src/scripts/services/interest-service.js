(function(){

  app.service('interestService', [
    'TRACKS',
    'trackService',
    'storageService',
    function(TRACKS, trackService, storageService){

      var INTERESTS_STORAGE_KEY = 'interests';

      var _public = {};

      _public.add = function(interest){
        var interests = getInterests();
        interests.push(interest);
        setInterests(interests);
        trackService.track(TRACKS.interests.added, {
          interestKeyword: interest.keyword
        });
      };

      _public.getAll = function(){
        return getInterests();
      };

      _public.remove = function(interest){
        var interests = getInterests();
        interests = removeInterest(interest, interests);
        if(!interests.length)
          removeAll();
        else
          setInterests(interests);
      };

      _public.hasInterests = function(){
        return this.getAll().length;
      };

      function getInterests(){
        return JSON.parse(storageService.get(INTERESTS_STORAGE_KEY)) || [];
      }

      function setInterests(interests){
        storageService.set(INTERESTS_STORAGE_KEY, JSON.stringify(interests));
      }

      function removeInterest(interest, interests){
        for (var i = 0; i < interests.length; i++){
          if(interests[i].id === interest.id){
            interests.splice(i, 1);
            trackService.track(TRACKS.interests.removed, {
              interestKeyword: interest.keyword,
              interestAddedOn: new Date(interest.id).toString()
            });
          }
        }
        return interests;
      }

      function removeAll(){
        storageService.remove(INTERESTS_STORAGE_KEY);
        trackService.track(TRACKS.interests.removedAll);
      }

      return _public;

  }]);

}());
