(function(){

  function interestCardController($window){
    var _public = this;

    _public.remove = function(interest){
      console.log('Removing ' + interest.keyword + '...');
    };
  }

  app.component('interestCard', {
    templateUrl: 'components/interest-card/interest-card-template.html',
    controller: [interestCardController],
    bindings: {
      interest: '='
    }
  });

}());
