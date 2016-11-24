angular.module('app')
.directive('dicas',function(){
  return{
   templateUrl: 'templates/dicasHtml.html',
   controller: 'homeController',
   replace: true
  }
})