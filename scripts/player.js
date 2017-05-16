var Player = function(name)
{   this.name = name;
    this.inningPitch = 'None';


    //Pi (1), Ca (2), 1B (3), 2B (4), 3B (5), SS (6), LF (7), CF (8), RF (9)   
    //Preferred positions
    this.posPrefer = [false,false,false,false,false,false,false,false,false];
    //Avoided positions
    this.posAvoid = [false,false,false,false,false,false,false,false,false];
    this.posPlaytime = [0,0,0,0,0,0,0,0,0];

    this.showPrefer = false;
    this.showAvoid = false;
}

var initializePlayers = function(){
    var myPlayers = [];
    var p1 = new Player('P1 Sally');
    p1.posPrefer=[false,false,false,false,false,false,true,true,true];
    p1.posAvoid=[true,true,true,true,false,false,false,false,false];

    myPlayers.push(p1);

    var p2 = new Player('P2 Jim');
    p2.posPrefer=[true,false,true,false,true,false,true,true,true];
    p2.posAvoid=[false,false,false,false,false,false,false,false,false];
    myPlayers.push(p2);

    var p3 = new Player('P3 Mike');
    p3.posPrefer=[true,true,true,false,true,true,true,true,true];
    p3.posAvoid=[false,false,false,false,false,false,false,false,false];

    myPlayers.push(p3);

    var p4 = new Player('P4 Lucy');
    p4.posPrefer=[true,true,true,false,true,false,true,true,true];
    p4.posAvoid=[false,false,false,false,false,false,false,false,false];

    myPlayers.push(p4);

    var p5 = new Player('P5 Nathan');
    p5.posPrefer=[true,true,true,false,false,false,true,true,false];
    p5.posAvoid=[false,false,false,false,false,false,false,false,false];

    myPlayers.push(p5);

    var p6 = new Player('P6 Clarissa');
    p6.posPrefer=[true,true,true,true,false,false,false,true,true];
    p6.posAvoid=[false,false,false,false,false,false,false,false,false];

    myPlayers.push(p6);

    var p7 = new Player('P7 Chang');
    p7.posPrefer=[false,false,true,false,false,false,true,false,true];
    p7.posAvoid=[false,false,false,false,false,false,false,false,false];

    myPlayers.push(p7);
    
    var p8 = new Player('P8 Esperanza');
    p8.posPrefer=[true,false,true,false,false,false,true,false,false];
    p8.posAvoid=[false,false,false,false,false,false,false,false,false];

    myPlayers.push(p8);

    var p9 = new Player('P9 Sukimoto');
    p9.posPrefer=[false,true,false,true,false,false,false,true,false,false];
    p9.posAvoid=[false,false,false,false,false,false,false,false,false];

    myPlayers.push(p9);

    return myPlayers;
}
