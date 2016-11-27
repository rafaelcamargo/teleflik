(function(){

  'use strict';

  var BASE_URL = 'http://leecher.herokuapp.com/leechs';
  var TV_PROVIDER_BASE_URL = 'http://programacao.netcombo.com.br/gatekeeper/';
  var TV_PROVIDER_DEFAULT_PARAMS = 'select?q=id_cidade:40&wt=json&rows=100000';
  var TV_PROVIDER_CHANNELS_PARAMS = '&sort=cn_canal+asc&fl=id_canal+st_canal+cn_canal+nome&fq=nome%3A*&_=' + new Date().getTime();
  var TV_PROVIDER_SHOWS_PARAMS = '&sort=id_canal+asc%2Cdh_inicio+asc&fl=dh_fim+dh_inicio+st_titulo+titulo+id_programa+id_canal&_=' + new Date().getTime();

  app.constant('API', {
    ENDPOINTS: {
      BASE: BASE_URL,
      CHANNELS: TV_PROVIDER_BASE_URL + 'canal/' + TV_PROVIDER_DEFAULT_PARAMS + TV_PROVIDER_CHANNELS_PARAMS,
      SHOWS: TV_PROVIDER_BASE_URL + 'exibicao/' + TV_PROVIDER_DEFAULT_PARAMS + TV_PROVIDER_SHOWS_PARAMS
    }
  });

}());
