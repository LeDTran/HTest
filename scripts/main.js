// var list = [];
// function getText() {
    // var str = document.getElementById("newTask");

    // list.push(str.value);
    // str.value = "";
    // str.focus();
    // var area = document.getElementById("txtArea");
    // area.value = "";
    // for (var i = 0; i < list.length; i++) {
        // area.value += list[i] + "\n";
    // }
// }

//document.getElementById("add").onclick = function() {
    // First things first, we need our text:
//    var text = document.getElementById("idea").value; //.value gets input values

    // Now construct a quick list element
//    var li = "<li>" + text + "</li>";

    // Now use appendChild and add it to the list!
//    document.getElementById("list").appendChild(li);
//}


//application modules
var app = angular.module('app', []);

//controllers
app.controller('demoController', function($scope) {
    // initial items
    $scope.players = [
    ];
    var firstPlayer = new Player("Player" + $scope.players.length, $scope.players.length);
    $scope.players.push(firstPlayer);

        // add an item
    $scope.addNewPlayer = function() {
      var newPlayer = new Player("Player" + $scope.players.length, 20);
      //newPlayer.name = "Player" + $scope.players.length;
      newPlayer.name = $scope.players[$scope.players.length-1].name + $scope.players.length;
      newPlayer.psyhp = $scope.players.length;
      $scope.players.push(newPlayer);
    };

    $scope.removePlayer = function(playerIndex){
      $scope.players.splice(playerIndex, 1);
    }

    //only 
    $scope.markAll = function(allChecked) {
      //$scope.items.splice(index, 1);
      for(var i = 0; i < $scope.players.length; i++){
        //$scope.items[i].done=true;
        $scope.players[i].done=allChecked;
      }
    };
    
    $scope.numLeft = function(){
      var x = 0;
      for(var j = 0; j < $scope.players.length; j++){
        if($scope.players[j].done==false){
          x++;
        }
      }
      return x;
    }
    
    $scope.clearItems = function(){
      for(var k = 0; k < $scope.players.length; k++){
        if($scope.players[k].done==true){
          $scope.players.splice(k, 1);
          //need to decrement k b/c splice shifts the index
          k--;
        }
      }
    }
    
    $scope.showClear = function(){
      for(var l = 0; l < $scope.players.length; l++){
        if($scope.players[l].done==true){
          return true;
        }
      }
      return false;
    }
    
    
});
