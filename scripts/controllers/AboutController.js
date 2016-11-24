(function(){
   angular.module('app')
      .controller('aboutController', aboutController);

      aboutController.$inject = ['$scope'];

      function aboutController($scope) {
         $scope.message = 'About Controller';
      };
    

})();