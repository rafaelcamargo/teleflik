(function(){

  function interestListController($scope, interestService){
    var _public = this;

    $scope.$on('interest list outdated', updateList);
    $scope.$on('interest list item removed', getList);

    function getList(){
      _public.interests = interestService.getAll();
    }

    function updateList(evt, interest){
      _public.interests.unshift(interest);
    }

    getList();
  }

  app.component('interestList', {
    templateUrl: 'components/interest-list/interest-list-template.html',
    controller: ['$scope', 'interestService', interestListController]
  });

}());
