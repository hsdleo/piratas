    (function(){

     var client;

     angular.module('app')
     .controller('homeController', homeController);

     homeController.$inject = ['$scope','$interval'];

     function homeController($scope,$interval) {
       $scope.format = 'mm:ss';
       var timer1 = 3600;

       function formatNumber(n) {return (n<10? '0' : '') + n;}
       client = mows.createClient('ws://192.168.0.100:9001/mqtt');
       client && client.subscribe('topicoArduinoPronto');

       client.on('message', function (topic, message) {
         console.log(message);

         if(message=="1"){
          $scope.aguardando = false;
          $scope.preparar = true;
          $scope.tocarNada();
         }else{
        if(message=="2"){
          $scope.aguardando = false;
          $scope.preparar = false;
          $scope.tocarNada();
        }else{
          if(message=="3"){
          $scope.tocarAmbiente();
          $scope.tocarMedo();
   
          }
          else{
            if(message=="4"){
             $scope.tocarMedo();
            $scope.tocarPassagem();
            }

        }}}

         $scope.message = message;
       });

       $scope.tocarNada = function(){
      $scope.audioNada.setVolume(0.1);
        $scope.audioNada.stop();
       };
      $scope.tocarAmbiente = function () {
        $scope.audioAmbiente.setVolume(0.2);
        $scope.audioAmbiente.play();
      };
  
      $scope.tocarMedo = function () {
        $scope.audioAmbiente.setVolume(0.2);
        $scope.audioAmbiente.playPause();
      };
      $scope.tocarPassagem= function () {
        $scope.audioAmbiente.setVolume(0.2);
        $scope.audioAmbiente.play();
      };
      $scope.tocarDerrota = function () {
        $scope.audioDerrota.setVolume(0.6);
        $scope.audioDerrota.play();
      };

      $scope.tocarArma = function () {
        $scope.audioArma.setVolume(0.25);
        $scope.audioArma.playPause();
      };
      $scope.tocarUnlock = function () {
        $scope.audioUnlock.setVolume(0.25);
        $scope.audioUnlock.playPause();
      };
      $scope.tocarTrovao = function () {
        $scope.audioTrovao.setVolume(0.2);
        $scope.audioTrovao.play();
      };


      $scope.tocarSirene = function () {
        $scope.audioSirene.setVolume(0.2);
        $scope.audioSirene.playPause();
      };
      $scope.tocarObjetos = function () {
        $scope.audioObjetos.setVolume(1);
        $scope.audioObjetos.play();
      };


      $scope.minuto = formatNumber(Math.floor(timer1 / 60));
      $scope.segundo = formatNumber(timer1%60);
      $scope.message = 'Home Controller';
      

      $scope.imprimir = function(arg){
      }
  
      var stop;
      $scope.startTimer = function() {
              // Don't start a new fight if we are already fighting
              if ( angular.isDefined(stop) ) return;
              
              stop = $interval(function() {
                if (timer1 > 0 ) {
                  timer1 = timer1- 1;
                  if(timer1 == 60){$scope.tocarSirene();}
                  $scope.minuto = formatNumber(Math.floor(timer1 / 60));
                  $scope.segundo = formatNumber(timer1%60);
                } else {
                  $scope.stopTimer();
                  $scope.tocarSirene();
                  $scope.tocarDerrota();
                }
              }, 1000,0);
            };

            $scope.stopTimer = function() {
              if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
              }
            };

            $scope.resetTimer = function() {
              $scope.stopTimer();
              timer1 = 3600;

              $scope.minuto = formatNumber(Math.floor(timer1 / 60));
              $scope.segundo = formatNumber(timer1%60);
            };

            $scope.$on('$destroy', function() {
              // Make sure that the interval is destroyed too
              $scope.stopTimer();
            });

           //$scope.sound = ngAudio.load("sounds/sirene.mp3"); // returns NgAudioObject


           $scope.dicas = [{"id":"1","texto":"Cama (1)"},
           {"id":"2","texto":"Cama (2)"},
           {"id":"3","texto":"Ficha (1)"},
           {"id":"4","texto":"Ficha (2)"},
           {"id":"5","texto":"Alvo"},
           {"id":"6","texto":"Cobertor"},
           {"id":"7","texto":"Apelido"},
           {"id":"8","texto":"Tangram"}];


           $scope.alertas = [{"id":"1","texto":"Não tire as GARRAFAS"},
           {"id":"2","texto":"Não FORÇE nenhum objeto"}];

           $scope.acionamentos = [{"id":"1","texto":"Abrir Passagem"},
           {"id":"2","texto":"Fechar Passagem"},
           {"id":"3","texto":"Desligar Luz Conves"},
           {"id":"4","texto":"Ligar Luz Conves"},
           {"id":"5","texto":"Desligar Luz Capitao"},
           {"id":"6","texto":"Ligar Luz Capitao"},
           {"id":"7","texto":"Abrir Saída"},
           {"id":"8","texto":"Fechar Saída"}];

           $scope.efeitos = [{"id":"1","texto":"Macaco"},
           {"id":"2","texto":"Trovao"},
           {"id":"3","texto":"Sino"}];

    
           $scope.prepararJogo = function() {
            client && client.publish('topicoPrincipal', String('01'));
            $scope.comandoLuzCapitao(1);

          };
          $scope.startJogo = function() {
            $scope.startTimer();
            $scope.tocarAmbiente();
            $scope.comandoLuzCapitao(0);

            client && client.publish('topicoPrincipal', String('01'));
          };


          $scope.resetarJogo = function() {
            $scope.resetTimer();
            $scope.comandoLuzCela(0);
            $scope.audioAmbiente.stop();
            client && client.publish('topicoPrincipal', String('00'));
          };

          $scope.comandoPassagem = function(cod) {
            var msg = '1' + cod; 
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;

          };

          $scope.comandoSaida = function(cod) {
            var msg = '2' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };
          $scope.comandoGaveta= function(cod) {
            var msg = '3' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };
          $scope.comandoLuzCapitao = function(cod) {
            var msg = '4' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };

          $scope.comandoLuzConves= function(cod) {
            var msg = '5' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };
          $scope.comandoBau= function(cod) {
            var msg = '6' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };
          $scope.efeitoTrovao= function() {
            var msg = '70' ;
            $scope.tocarTrovao();
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };

          

        }
      })();