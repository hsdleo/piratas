angular.module('app')
.directive('acio',function(){
  return{
   templateUrl: 'templates/acionamentosHtml.html',
   controller: 'homeController',
   replace: true
  }
})