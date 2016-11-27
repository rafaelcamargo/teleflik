(function(){

  function showCardController($ionicPopup){
    var _public = this;

    _public.showMediaDetails = function(media){
      $ionicPopup.alert({
        title: 'Detalhes do Canal',
        template: 'Nome: ' + media.name + '<br/>' + 'Número: ' + media.number
      });
    };
  }

  app.component('showCard', {
    templateUrl: 'components/show-card/show-card-template.html',
    controller: ['$ionicPopup', showCardController],
    bindings: {
      show: '='
    }
  });

}());
