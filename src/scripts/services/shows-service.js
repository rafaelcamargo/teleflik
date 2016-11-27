(function(){

  'use strict';

  app.service('showsService', [
    '$q',
    'channelResource',
    'showResource',
    'interestService',
    function($q, channelResource, showResource, interestService){

      var _public = {};

      _public.getInteresting = function(interests){
        return $q(function(resolve, reject) {
          $q.all(buildRequests())
            .then(function(responses){
              var interestingShows = filterShowsByInterests(responses, interests);
              resolve(interestingShows);
            }, function(error){
              reject(error);
            });
        });
      };

      function buildRequests(){
        return [
          channelResource.get().$promise,
          showResource.get().$promise
        ];
      }

      function filterShowsByInterests(responses, interests){
        var interestingShows = [];
        var channels = indexChannelsById(parseResponse(responses[0]));
        var shows = parseResponse(responses[1]);
        for (var i = 0; i < shows.length; i++) {
          var show = shows[i];
          if(isInterestingShow(show, interests) && !wasShowAlreadyFiltered(show, interestingShows)){
            show = formatInterestingShow(show, channels);
            interestingShows.push(show);
          }
        }
        return interestingShows;
      }

      function parseResponse(response){
        var parsedResponse = JSON.parse(response.content);
        return parsedResponse.response.docs;
      }

      function indexChannelsById(channels){
        var indexedChannels = {};
        for (var i = 0; i < channels.length; i++)
          indexedChannels[channels[i].id_canal] = channels[i];
        return indexedChannels;
      }

      function isInterestingShow(show, interests){
        for (var i = 0; i < interests.length; i++){
          var showTitle = lowercasify(show.titulo);
          var interestKeyword = lowercasify(interests[i].keyword);
          if(showTitle.indexOf(interestKeyword) > -1)
            return true;
        }
      }

      function wasShowAlreadyFiltered(show, interestingShows){
        for (var i = 0; i < interestingShows.length; i++)
          if(interestingShows[i].title == show.titulo)
            return true;
      }

      function formatInterestingShow(show, channels){
        return {
          title: show.titulo,
          date: formatInterestingShowDate(show.dh_inicio),
          time: formatInterestingShowTime(show.dh_inicio),
          media: getChannel(show, channels).name
        };
      }

      function formatInterestingShowDate(dateISOString){
        var date = new Date(dateISOString);
        var day = appendLeadingZero(date.getDate());
        var month = appendLeadingZero(date.getMonth()+1);
        return [day, month].join('/');
      }

      function formatInterestingShowTime(dateISOString){
        var date = new Date(dateISOString);
        var hours = appendLeadingZero(date.getHours());
        var minutes = appendLeadingZero(date.getMinutes());
        return [hours, minutes].join(':');
      }

      function getChannel(show, channels){
        var channel = channels[show.id_canal];
        return {
          name: channel.nome,
          number: channel.cn_canal
        };
      }

      function appendLeadingZero(number){
        return number < 10 ? '0'+number : number;
      }

      function lowercasify(text){
        return text.toLowerCase();
      }

      return _public;

  }]);

}());
