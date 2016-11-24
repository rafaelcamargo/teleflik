(function(){

  function interestListController(){
    var _public = this;

    _public.interests = [
      {
        id: 1,
        keyword: 'Skank'
      },
      {
        id: 2,
        keyword: 'Oasis'
      },
      {
        id: 3,
        keyword: 'Pearl Jam'
      },
    ];
  }

  app.component('interestList', {
    templateUrl: 'components/interest-list/interest-list-template.html',
    controller: [interestListController]
  });

}());
