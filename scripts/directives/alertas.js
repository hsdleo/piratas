angular.module('app')
.directive('alertas',function(){
  return{
   templateUrl: 'templates/alertasHtml.html',
   controller: 'homeController',
   replace: true
  }
})