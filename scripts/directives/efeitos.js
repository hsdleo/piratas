angular.module('app')
.directive('efeitos',function(){
  return{
   templateUrl: 'templates/efeitosSonorosHtml.html',
   controller: 'homeController',
   replace: true
  }
})