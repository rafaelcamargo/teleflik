(function(){

  function interestFormController($scope, interestService){
    var _public = this;

    _public.interest = {};

    _public.add = function(){
      var interest = _public.interest;
      _public.interest.id = new Date().getTime();

      if(_public.interest.keyword)
        interestService.add(_public.interest);

      $scope.$emit('interest added', _public.interest);
      _public.interest = {};
    };
  }

  app.component('interestForm', {
    templateUrl: 'components/interest-form/interest-form-template.html',
    controller: ['$scope', 'interestService', interestFormController]
  });

}());
