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
  //value for number of innings. Need to be in bracket b/c of scoping? to ensure prototypical inheritance
  $scope.numInnings = [6];
  //workaround to print variable number of inning columns
  $scope.numInningsColumns=[];
  $scope.inningPitchSelect = ['None',1,2,3,4,5,6];
  $scope.printInnings=[];
  $scope.printPositions=[];
  $scope.page = 'editRoster';

  $scope.addNewPlayer = function() {
        console.log($scope.numInnings);

    if($scope.players.length >=15){
      alert("Can not have more than 15 players!", "WARNING");
    }

    else{
      var newPlayer = new Player("New Player Name");
      newPlayer.psyhp = $scope.players.length;
      $scope.players.push(newPlayer);
    }
  };

  $scope.removePlayer = function(playerIndex){
    if($scope.players.length <= 9){
      alert("Must have at least 9 players!", "WARNING");
    }
    else{
      $scope.players.splice(playerIndex, 1);
    }
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

  //printInnings filled in as array of inning array
  //Needs to be reorderd as array of position array, for proper display on html
  function getPrintPositions(){
    var currPosition = [];
    var allPosition = [];
    console.log($scope.printInnings[0].length);

    for(var i = 0; i < $scope.printInnings[0].length; i++){
      for(var j = 0; j < $scope.printInnings.length; j++){
        currPosition.push($scope.printInnings[j][i]);
      }
      allPosition.push(currPosition);
      //console.log(currPosition);
      currPosition=[];
    }

    return allPosition;
  }

  $scope.displayLineup = function(){
      console.log("GO TO DISPLAY");
      $scope.page = 'displayLineup';

  }

  $scope.toEditRoster = function(index){
      console.log("GO TO EDIT");
      $scope.page = 'editRoster';
  }

  $scope.displayPrefer = function(index){
    $scope.players[index].showPrefer = !$scope.players[index].showPrefer;
  }
  $scope.displayAvoid = function(index){
    $scope.players[index].showAvoid = !$scope.players[index].showAvoid;
  }

  
  $scope.buildLineups = function(){
    //Reset and rebuild inning display header
    $scope.numInningsColumns=[];
    for(var j = 1; j <= $scope.numInnings[0]; j++){
      $scope.numInningsColumns.push(j);
    }

    $scope.printInnings = [];
    $scope.printPositions = [];


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

    for(var i = 0; i < $scope.numInnings[0]; i++){
      getCurrInning(group1, group2, group3);
      group1 = rotateGroup(group1);
      group2 = rotateGroup(group2);
      group3 = rotateGroup(group3);
    }    

    $scope.printPositions = getPrintPositions();

    $scope.displayLineup();

  }

});
