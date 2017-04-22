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


  // initial items
  $scope.players = [];
  // var firstPlayer = new Player('New Player');
  // $scope.players.push(firstPlayer);
  $scope.players = initializePlayers();
  $scope.numInningSelect = [1,2,3,4,5,6];
  $scope.numInnings = 6;
  $scope.inningPitchSelect = ['None',1,2,3,4,5,6];
  $scope.printInnings=[];
  $scope.listPitchers=[];

  $scope.page = 'editRoster';

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

//write general function to get player

  function assignPosition(){
    return 5;
  }

  function getCurrInning(group1, group2, group3){
    var currInning = [];

    currInning.push(group1[0]);
    currInning.push(group1[1]);
    currInning.push(group2[0]);
    currInning.push(group2[1]);
    currInning.push(group3[0]);
    currInning.push(group3[1]);

    currInning.push(group1[2]);
    currInning.push(group2[2]);
    currInning.push(group3[2]);

    $scope.printInnings.push(currInning);

  }

  function rotateGroup(currGroup){
    currGroup.push(currGroup[0]);
    currGroup.shift();
    return currGroup;
  }

    $sc.displayLineup = function(){
        $scope.page = 'displayLineup';
    }

    $sc.toEditRoster = function(index){
        $scope.page = 'editRoster';
    }

  
  $scope.buildLineups = function(){
    $scope.listPitchers = [];

    //pos 1,2,7 (Ca, Pi, LF)
    var group1 = [];
    //pos 3,4,8 (1B, 2B CF)
    var group2 = [];
    //pos 5,6,9 (3B, SS, RF)
    var group3 = [];

    //push players into group slots
    group1.push($scope.players[0]);
    group1.push($scope.players[1]);
    group1.push($scope.players[6]);

    group2.push($scope.players[2]);
    group2.push($scope.players[3]);
    group2.push($scope.players[7]);

    group3.push($scope.players[4]);
    group3.push($scope.players[5]);
    group3.push($scope.players[8]);

 
    for(var i = 0; i < $scope.numInnings; i++){
      getCurrInning(group1, group2, group3);
      group1 = rotateGroup(group1);
      group2 = rotateGroup(group2);
      group3 = rotateGroup(group3);
    }    

    $scope.displayLineup();

  }

});
