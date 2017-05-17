//application modules
var app = angular.module('app', ['ngAnimate']);

//controllers
app.controller('lineupController', function($scope) {


  //----------------------Initializations----------------------
  // initial items
  $scope.players = [];
  $scope.players = initializePlayers();
  $scope.numInningSelect = [1,2,3,4,5,6];
  $scope.numInnings = 6;

  //workaround to print variable number of inning columns
  $scope.numInningsColumns=[];
  $scope.inningPitchSelect = ['None',1,2,3,4,5,6];

  $scope.printInnings=[];
  $scope.printPositions=[];
  $scope.page = 'editRoster';

  //----------------------Rules/Conditions----------------------
  //MPR = Minimum Play Rules
  $scope.ruleMPR = true; 

  $scope.addNewPlayer = function() {
        console.log($scope.numInnings);

    if($scope.players.length >=15){
      alert("Can not have more than 15 players!", "WARNING");
    }

    else{
      var newPlayer = new Player("New Player Name");
      $scope.players.push(newPlayer);
    }
  }

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

  //----------------------UI Functions for HTML/Angular----------------------
  $scope.displayLineup = function(){
    // console.log("GO TO DISPLAY");
    $scope.page = 'displayLineup';
  }
  $scope.toEditRoster = function(index){
    // console.log("GO TO EDIT");
    $scope.page = 'editRoster';
  }

  $scope.displayPrefer = function(index){
    $scope.players[index].showPrefer = !$scope.players[index].showPrefer;
  }
  $scope.displayAvoid = function(index){
    $scope.players[index].showAvoid = !$scope.players[index].showAvoid;
  }

  $scope.fixPreferAvoid = function(state, pos, playerIndex){
    console.log("FUCK" + playerIndex);
    console.log(state);

    if(state=='prefer'){
      if($scope.players[playerIndex].posPrefer[pos]==false && $scope.players[playerIndex].posAvoid[pos]==true){
        $scope.players[playerIndex].posAvoid[pos]=false;
      }
    }
    if(state=='avoid'){
      console.log("AVOID: " + state + pos);
      if($scope.players[playerIndex].posAvoid[pos]==false && $scope.players[playerIndex].posPrefer[pos]==true){
        $scope.players[playerIndex].posPrefer[pos]=false;
      }
    }
  }

  $scope.setMPRSwitch = function(){
    var state = document.getElementById("rule1").disabled;
    document.getElementById("rule1").disabled = !state;
    document.getElementById("rule2").disabled = !state;
  }

  $scope.refreshPositions = function(){

  }

  //--------------------------------------------Reclear Lineup---------------------------------------------
  //Empties out and refreshes inning positions, to be used for new lineup
  //Returns inningNum x numPlayers matrix of FALSE values

  $scope.reclearLineup = function(){
    var newLineup = [];
    console.log(newLineup);

    for(var j = 0; j < $scope.numInnings; j++){
      var posPerInning = [];
      //-------------------------------------------------------------------------->change this to numplayers later
      for(var i = 0; i < $scope.players.length; i++){    
        posPerInning.push(false);
      }
      newLineup.push(posPerInning);
    }

    console.log(newLineup);
    return newLineup;
  }


  //printInnings filled in as array of inning array
  //Needs to be reorderd as array of position array, for proper display on html
  function getPrintPositions(){
    var currPosition = [];
    var allPosition = [];

    for(var i = 0; i < $scope.printInnings[0].length; i++){
      for(var j = 0; j < $scope.printInnings.length; j++){
        currPosition.push($scope.printInnings[j][i]);
      }
      allPosition.push(currPosition);
      currPosition=[];
    }
    return allPosition;
  }

  //--------------------------------------------MPR Assignment---------------------------------------------
  //If MPR switch is on, do initialze assignment of 2 outfield/1 infield positions

  //Assigns 2 outfield and 1 infield positions for each player
  $scope.MPRInitialize = function(){
    for(var i = 0; i < $scope.players.length; i++){
      $scope.assignField('infield',$scope.players[i]);          
    }
    for(var i = 0; i < $scope.players.length; i++){  
      $scope.assignField('infield',$scope.players[i]);              
    }
    for(var i = 0; i < $scope.players.length; i++){
      $scope.assignField('outfield',$scope.players[i]);       
    }
  }

  //Assigns player to positions based on preferences 
  //Prioritized by: preferred, then neutral, then avoided positions
  $scope.assignField = function(inOrOut,player){
    var potentialInning;
    if(inOrOut == 'infield'){
      var posStart = 0;
      var posEnd = 6;
    }
    else if(inOrOut == 'outfield'){
      var posStart = 6;
      var posEnd = 9;
    }

    for(var pos=posStart; pos<posEnd; pos++){
      console.log(player.name + " ASSIGNFIELD1");
      if(player.posPrefer[pos]==true){
        console.log(pos);
        if($scope.chooseByPreference(player, pos)== true){
          return;
        }
      }
    }

    for(var pos=posStart; pos<posEnd; pos++){
      // console.log(player.name + " ASSIGNFIELD2");
      if(player.posPrefer[pos]==false && player.posAvoid[pos]==false){
        if($scope.chooseByPreference(player, pos)== true){
          return;
        }
      }
    }    

    for(var pos=posStart; pos<posEnd; pos++){
      if(player.posAvoid[pos]==true){
        if($scope.chooseByPreference(player, pos)== true){
          return;
        }
      } 
    }
  }



  //right now looks for empty inning given position, reurns inning, then checks if repeat inning
  //but then next step would be to check next innning with empty spot

  //Given player and potential position, returns true if successfully finds 
  //an inning with that position open, and assigns the player to it
  $scope.chooseByPreference = function(player, pos){
    // console.log(player.name + "CHOOSEBYPREFFFIELD");

    // potentialInning = $scope.checkLineupSpot(pos);
    // if(potentialInning != -1){
    //   if($scope.checkInningRepeat(player, potentialInning)==false){
    //     $scope.printInnings[potentialInning][pos] = player;
    //     return true;
    //   }
    // }

    for(var potentialInning = 0; potentialInning<$scope.numInnings; potentialInning++){
      if($scope.printInnings[potentialInning][pos] == false){
        if($scope.checkInningRepeat(player, potentialInning)==false){
          $scope.printInnings[potentialInning][pos] = player;
          return true;
        }
      }
    }
    return false;
  }

  //For position specified, looks in each inning for an empty spot not already assigned to a player
  //Returns inning number if empty position found, else return -1
  $scope.checkLineupSpot = function(pos){
    for(var i = 0; i <$scope.numInnings; i++){
      if($scope.printInnings[i][pos] == false){
        // console.log("EMPTY " + i);
        return i;
      }
    }
    return -1;
  }



  //--------------------------------------------Fill In Empty Spots---------------------------------------------

  $scope.fillEmpty = function(){

    //For each inning
    for(var i = 0; i < $scope.numInnings; i++){
      //For each position
      for(var j = 0; j < $scope.players.length; j++){
        if($scope.printInnings[i][j]==false){
          $scope.printInnings[i][j] = $scope.getValidPlayer(i,j);
        }
      }
    }
  }

  $scope.getValidPlayer = function(inningNum, pos){
    //Test players that prefer this position
    for(var i = 0; i < $scope.players.length; i++){
      if($scope.players[i].posPrefer[pos]==true){
        if($scope.checkConditions($scope.players[i], inningNum, pos)==true){
          return $scope.players[i];
        }
      }
    }

    //Test players that are neutral with this position
    for(var i = 0; i < $scope.players.length; i++){
      if($scope.players[i].posPrefer[pos]==false && $scope.players[i].posAvoid[pos]==false){
        if($scope.checkConditions($scope.players[i], inningNum, pos)==true){
          return $scope.players[i];
        }
      }
    }

    //Test players that avoid this position
    for(var i = 0; i < $scope.players.length; i++){
      if($scope.players[i].posAvoid[pos]==true){
        if($scope.checkConditions($scope.players[i], inningNum, pos)==true){
          return $scope.players[i];
        }
      }
    }

    return false;
  }

  //Tests a player against conditions, position, and inning 
  //Returns true if passes all, else false if fails even one condition
  $scope.checkConditions =function(player, inningNum, pos){
    var stillValid = true;

    //Check if player already assigned to that inning
    if($scope.checkInningRepeat(player, inningNum)==true){
      stillValid = false;
    }

    if($scope.ruleMPR==true){
      if($scope.checkPositionRepeat(player, pos, 2)==true){
        stillValid = false;
      }
    }

    //

    return stillValid;
  }

  //--------------------------------------------Conditions Checks---------------------------------------------

  //Returns true if player already assigned to that inning.
  //Used to prevent a player being assigned twice in one inning
  $scope.checkInningRepeat = function(player, inningNum){
    for(var i = 0; i < $scope.printInnings[0].length; i++){
      if($scope.printInnings[inningNum][i] == player){
        return true;
      }
    }
    return false;
  }

  //Returns true if player has been assigned position X times already
  $scope.checkPositionRepeat = function(player, pos, timesAssigned){
    var alreadyAssigned = 0;
    for(var i=0; i < $scope.numInnings; i++){
      if($scope.printInnings[i][pos]==player){
        alreadyAssigned++;
      }
    }
    if(alreadyAssigned>=timesAssigned){
      return true;
    }
    else return false;
  }



  //--------------------------------------------Build Lineups---------------------------------------------
  $scope.buildLineups = function(){
    //Reset and rebuild inning display header
    $scope.numInningsColumns=[];
    for(var j = 1; j <= $scope.numInnings; j++){
      $scope.numInningsColumns.push(j);
    }

    $scope.printInnings = [];
    $scope.printPositions = [];
    console.log($scope.printInnings);


    var temp = $scope.reclearLineup();
    console.log(temp);
    $scope.printInnings = temp;

    if($scope.ruleMPR==true){
      $scope.MPRInitialize();
    }

    //$scope.fillEmpty();

    $scope.printPositions = getPrintPositions();

    $scope.displayLineup();
  }

});

