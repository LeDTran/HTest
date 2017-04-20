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
app.controller('lineupController', function($scope) {
  var Player = function(name)
  {   this.name = name;
      this.psyhp = 100;
      this.coghp = 200;
      this.physhp = 300;
      this.inningPitch = 'None';

      //Prefer
      this.preferPi = true;
      this.preferCa = false;
      this.prefer1B = false;
      this.prefer2B = false;
      this.prefer3B = false;
      this.preferSS = false;
      this.preferLF = false;
      this.preferCF = false;
      this.preferRF = false;

      //Avoid
      this.avoidPi = false;
      this.avoidCa = false;
      this.avoid1B = false;
      this.avoid2B = false;
      this.avoid3B = false;
      this.avoidSS = false;
      this.avoidLF = false;
      this.avoidCF = false;
      this.avoidRF = false;
  }


  // initial items
  $scope.players = [];
  var firstPlayer = new Player('New Player');
  $scope.players.push(firstPlayer);
  $scope.numInningSelect = [1,2,3,4,5,6];
  $scope.numInnings = 1;
  $scope.inningPitchSelect = ['None',1,2,3,4,5,6];

      // add an item
  $scope.addNewPlayer = function() {
    var newPlayer = new Player("New Player");
    //newPlayer.name = "Player" + $scope.players.length;
    //newPlayer.name = $scope.players[$scope.players.length-1].name + $scope.players.length;
    newPlayer.psyhp = $scope.players.length;
    $scope.players.push(newPlayer);
  };

  $scope.removePlayer = function(playerIndex){
    $scope.players.splice(playerIndex, 1);
  }
  
});
