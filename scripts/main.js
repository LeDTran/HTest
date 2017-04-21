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

  
  $scope.buildLineups = function(){
    $scope.listPitchers = [];

    // $scope.listPitchers = $scope.players.filter(function (abc) {
    // return (abc.preferPos[1] == true);
    // });

    // var testArray = [];
    // testArray.push($scope.players[0]);
    // testArray[0].name = "Hello";
    // console.log('NAME: '+ $scope.players[0].name);


    var num = assignPosition();
    console.log('inside buildlineups' + num);
    $scope.printInnings = [];



    //i = innings
    //j = positions [0,1,2,3,4,5,6,7,8,9]


  //   var pos = $scope.players.map(function(e) { return e.name; }).indexOf('P8');

  //   console.log("pos:" + pos);

  //   for(var i = 0; i < $scope.numInnings; i++){
  //     var currInning = ['blank'];

  //     for(var j = 0; j < 10; j++){
  //       //get pitcher
  //       var viablePitchers = $scope.players.filter(function (pi) {return (pi.posPlaytime[1] < 3);});
  //       var index = 0;

  //       do {
  //         index = Math.floor(Math.random()*viablePitchers.length)
  //       }
  //       while ();


  //       currInning.push(viablePitchers[index]);







  //       currInning.push($scope.players[j]);
  //     }
  //     $scope.printInnings.push(currInning);
  //   }

  }

});
