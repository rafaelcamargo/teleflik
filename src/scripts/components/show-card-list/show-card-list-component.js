(function(){

  function showCardListController(){
    var _public = this;

    _public.shows = [
      {
        title: 'Cidade de Deus',
        date: '26/11',
        time: '21:20',
        media: 'Cinemax'
      },
      {
        title: 'Manhattan Connection',
        date: '27/11',
        time: '23:00',
        media: 'Globonews'
      },
      {
        title: 'Papo de Segunda',
        date: '28/11',
        time: '20:00',
        media: 'GNT'
      },
      {
        title: 'Conexão Roberto D\'ávila',
        date: '30/11',
        time: '00:00',
        media: 'Globonews'
      }
    ];
  }

  app.component('showCardList', {
    templateUrl: 'components/show-card-list/show-card-list-template.html',
    controller: showCardListController
  });

}());
