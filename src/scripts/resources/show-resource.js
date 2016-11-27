(function(){

  app.factory('showResource', [
    '$resource',
    'API',
    function($resource, API) {

      var DATE_INTERVAL_BASE_PARAM = '&fq=dh_inicio:[{{beginingStart}} TO {{beginingFinish}}] dh_fim:[{{endingStart}} TO {{endingFinish}}]';
      var FIFTEEN_MINUTES = 900000;
      var ONE_DAY = 86400000;

      function getDateIntervalParms(){
        start = new Date().getTime();
        end = start + ONE_DAY;
        var begining = getDateItervalBeginingParams(start, end);
        var ending = getDateItervalEndingParams(start, end);
        return getDateIntervalStringParam(begining, ending);
      }

      function getDateItervalBeginingParams(start, end){
        return {
          start: getISOStringDate(start - FIFTEEN_MINUTES),
          finish: getISOStringDate(end)
        };
      }

      function getDateItervalEndingParams(start, end){
        return {
          start: getISOStringDate(start + FIFTEEN_MINUTES),
          finish: getISOStringDate(end)
        };
      }

      function getISOStringDate(timestamp){
        return new Date(timestamp).toISOString();
      }

      function getDateIntervalStringParam(begining, ending){
        var param = DATE_INTERVAL_BASE_PARAM
          .replace('{{beginingStart}}', begining.start)
          .replace('{{beginingFinish}}', begining.finish)
          .replace('{{endingStart}}', ending.start)
          .replace('{{endingFinish}}', ending.finish);
        return encodeURI(param);
      }

      return $resource(API.ENDPOINTS.BASE, {}, {
        get: {
          method: 'GET',
          params: {
            url: API.ENDPOINTS.SHOWS + getDateIntervalParms()
          }
        }
      });

  }]);

}());
